const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    config: {
        name: "start",
        description: "Startet ein Gewinnspiel.",
        usage: "[channel] [duration] [winners] [prize]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: Du brauchst die \`MANAGE_MESSAGES\` Permissions um eine Verlosung zu starten.');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.channel.send(':boom: Du brauchst die \`MANAGE_MESSAGES\` Permissions um eine Verlosung zu starten.');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: <:ODGift:784350791379976213> Uh oh, Ich konnte diesen Kanal nicht finden! Probiere es erneut!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Hm. du hast keine Länge definiert, wäre doch doof?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Uh... Du hast keine Gewinneranzahl definiert.');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Es scheint du hast mir keinen akzeptablen Preis genannt!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: "<:ODGift:784350791379976213> **GIVEAWAY** <:ODGift:784350791379976213>",
                    giveawayZUENDE: "<:ODGift:784350791379976213> **GIVEAWAY ZUENDE** <:ODGift:784350791379976213>",
                    timeRemaining: "Noch: **{duration}**!",
                    inviteToParticipate: "Reagiere mit 🎉 zur Teilnahme!",
                    winMessage: "Glückwunsch, {winners}! Du/Ihr gewinnt **{prize}**!",
                    embedFooter: "Official Giveaways",
                    noWinner: "Nicht genug Teilnehmer zu einem Auszählen da!",
                    hostedBy: "gesponsert durch: {user}",
                    winners: "Gewinner",
                    ZUENDEAt: "ZUENDE am",
                    units: {
                        seconds: "Sekunden",
                        minutes: "Minuten",
                        hours: "Stunden",
                        days: "Tage",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + "<:ODGift:784350791379976213> **GIVEAWAY** <:ODGift:784350791379976213>",
                    giveawayZUENDE: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + "<:ODGift:784350791379976213> **GIVEAWAY ZUENDE** <:ODGift:784350791379976213>",
                    timeRemaining: "Noch: **{duration}**!",
                    inviteToParticipate: "Reagiere mit 🎉 zur Teilnahme!",
                    winMessage: "Glückwunsch, {winners}! Du/Ihr gewinnt **{prize}**!",
                    embedFooter: "Official Giveaways",
                    noWinner: "Nicht genug Teilnehmer zu einem Auszählen da!",
                    hostedBy: "gesponsert durch: {user}",
                    winners: "Gewinner",
                    ZUENDEAt: "ZUENDE am",
                    units: {
                        seconds: "Sekunden",
                        minutes: "Minuten",
                        hours: "Stunden",
                        days: "Tage",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@Verlosungen`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: "<:ODGift:784350791379976213> **GIVEAWAY** <:ODGift:784350791379976213>",
                    giveawayZUENDE: "<:ODGift:784350791379976213> **GIVEAWAY ZUENDE** <:ODGift:784350791379976213>",
                    timeRemaining: "Noch: **{duration}**!",
                    inviteToParticipate: "Reagiere mit 🎉 zur Teilnahme!",
                    winMessage: "Glückwunsch, {winners}! Du/Ihr gewinnt **{prize}**!",
                    embedFooter: "Official Giveaways",
                    noWinner: "Nicht genug Teilnehmer zu einem Auszählen da!",
                    hostedBy: "gesponsert durch: {user}",
                    winners: "Gewinner",
                    ZUENDEAt: "ZUENDE am",
                    units: {
                        seconds: "Sekunden",
                        minutes: "Minuten",
                        hours: "Stunden",
                        days: "Tage",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@Verlosungen\n\n` : "") + "<:ODGift:784350791379976213> **GIVEAWAY** <:ODGift:784350791379976213>",
                    giveawayZUENDE: (config["Giveaway_Options"].showMention ? `@Verlosungen\n\n` : "") + "<:ODGift:784350791379976213> **GIVEAWAY ZUENDE** <:ODGift:784350791379976213>",
                    timeRemaining: "Noch: **{duration}**!",
                    inviteToParticipate: "Reagiere mit 🎉 zur Teilnahme!",
                    winMessage: "Glückwunsch, {winners}! Du/Ihr gewinnt **{prize}**!",
                    embedFooter: "Official Giveaways",
                    noWinner: "Nicht genug Teilnehmer zu einem Auszählen da!",
                    hostedBy: "gesponsert durch: {user}",
                    winners: "Gewinner",
                    ZUENDEAt: "ZUENDE am",
                    units: {
                        seconds: "Sekunden",
                        minutes: "Minuten",
                        hours: "Stunden",
                        days: "Tage",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: "<:ODGift:784350791379976213> **GIVEAWAY** <:ODGift:784350791379976213>",
                    giveawayZUENDE: "<:ODGift:784350791379976213> **GIVEAWAY ZUENDE** <:ODGift:784350791379976213>",
                    timeRemaining: "Noch: **{duration}**!",
                    inviteToParticipate: "Reagiere mit 🎉 zur Teilnahme!",
                    winMessage: "Glückwunsch, {winners}! Du/Ihr gewinnt **{prize}**!",
                    embedFooter: "Official Giveaways",
                    noWinner: "Nicht genug Teilnehmer zu einem Auszählen da!",
                    hostedBy: "gesponsert durch: {user}",
                    winners: "Gewinner",
                    ZUENDEAt: "ZUENDE am",
                    units: {
                        seconds: "Sekunden",
                        minutes: "Minuten",
                        hours: "Stunden",
                        days: "Tage",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`<:ODGift:784350791379976213> Erledigt! Das Giveaway für \`${giveawayPrize}\` wurde erstellt in ${giveawayChannel}!`);
    }
}
