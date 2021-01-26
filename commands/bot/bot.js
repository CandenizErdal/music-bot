module.exports = {
    name: 'bot',
    aliases: [],
    category: 'Bot',
    utilisation: '{prefix}bot',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
          
        const istatistikler = new MessageEmbed()
       .setColor('PURPLE')
       .setThumbnail('https://cdn.discordapp.com/attachments/437713385912795146/766209519557804052/lightlogo.png')
       .addField(`${client.emojis.cache.find(emoji => emoji.id == "777959264719339530")} Geliştirici`, `<@259586807094575104>`,true)
       .addField(`${client.emojis.cache.find(emoji => emoji.id == "752464335980199967")} Gecikme`,client.ws.ping+" ms", true)
       .addField(":clipboard:  Sunucular", client.guilds.cache.size, true)
       .addField(":busts_in_silhouette: Kullanıcılar",  client.guilds.cache.array().reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
       .addField("Aktif Ses Kanalları", client.voice.connections.size, true)
       .addField("» Bağlantılar", " [Botu Ekle](https://discord.com/oauth2/authorize?client_id=437233090985984001&scope=bot&permissions=8) | [Destek Sunucusu](https://discord.com/invite/egyP99MCV2)")
       return message.channel.send(istatistikler);
    },
};