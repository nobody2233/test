const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  config: {
    name: "help",
    description: "Bekomme eine Supportseite",
    usage: "help",
    category: "Main",
    accessableby: "Everyone",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (client, message, args) => {
    let avatarOptions = {
      format: 'png',
      dynamic: true,
      size: 1024
    }

    const embed = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ ...avatarOptions }),
        'https://discord.gg/CT5tx9U'
      )
      .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
      .setTitle('Invite this Bot')
      .setURL('https://discord.com/oauth2/authorize?client_id=839482605216595979&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.events.stdlib.com%2Fdiscord%2Fauth%2F&scope=bot')
      .setColor('7289da')
      .setDescription(`Erstelle mit diesem Bot Gewinnspiele für dich und deine Community!`)
      .addFields({
        name: `🎉 ${config["Bot_Info"].prefix}start [Kanal] [Länge] [Gewinner] [Preis]`,
        value: [
          'Der Kanal muss für den Bot sichtbar sein.',
          'Man hält die Formatierung klar ein.',
          'Es können nur eine positive Anzahl an Gewinnern sein.',
          'Preis kann alles sein, auch nix.'
        ].join('\n')
      }, {
        name: '👥 Beispiel:',
        value: [
          `⌨️ ${config["Bot_Info"].prefix}start #general 10m 1 $9.99 Nitro`,
          `➡️ Erstellt ein \`10 minuten\` langes giveaway mit \`1\` gewinner und`,
          `\`$9.99 Nitro\` als Preis in \`#general\`.`
        ].join('\n')
      }, {
        name: `❌ ${config["Bot_Info"].prefix}end [message-id]`,
        value: 'Die Message-ID muss die **ID** der Verlosungsnachricht sein.\n**Nicht der Link!**'
      }, {
        name: '👥 Beispiel:',
        value: `⌨️ ${config["Bot_Info"].prefix}end 892678258946659587\n➡️ Ends the giveaway with the message-ID \`892678258946659587\`.`
      }, {
        name: `🔍 ${config["Bot_Info"].prefix}reroll [message-id]`,
        value: 'Die Message-ID muss die **ID** der Verlosungsnachricht sein.\n**Nicht der Link!**'
      }, {
        name: '👥 Beispiel:',
        value: `⌨️ ${config["Bot_Info"].prefix}reroll 892678258946659587\n➡️ Wählt neue Gewinner per Message-ID aus \`892678258946659587\`.`
      })
      .setFooter('Made with 💖 by MaxiFaxiPaxi', client.user.displayAvatarURL({ ...avatarOptions }))

    if (message.guild) {
      message.channel.send('Schaue in deine DMs!');
      message.delete();
      message.author.send(embed);
    } else {
      message.author.send(embed)
    }
  },
};