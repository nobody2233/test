const ms = require('ms');
const config = require("../../config.json")
module.exports = {
    config: {
        name: "reroll",
        description: "Rerolls a giveaway.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Du brauchst die \`MANAGE_MESSAGES\` Permissions um eine Verlosung neu auszulosen.');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Uh oh, Ich konnte diese Nachricht nicht mal durch ein Fehrnrohr sehen! Probiers nochmal!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Hm. Ich konnte kein Giveaway finden für `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Giveaway neu ausgelost!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended.`)) {
                    message.channel.send('Dieses Giveaway läuft noch!');
                } else {
                    console.error(e);
                    message.channel.send('Bitte wende dich an MaxiFaxiPaxi! Error 414-99...');
                }
            });
    },
}

