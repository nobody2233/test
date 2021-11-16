module.exports = {
    config: {
        name: "end",
        description: "Ends a giveaway.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Du brauchst die \`MANAGE_MESSAGES\` Permissions um eine Verlosung zu beenden.');
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
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Giveaway endet in weniger als ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' Sekunden...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {

                    message.channel.send('Dieses Giveaway ist bereits beendet!');

                } else {
                    console.error(e);
                    message.channel.send('Bitte wende dich an MaxiFaxiPaxi! Error 414-88...');
                }
            });
    },
}
