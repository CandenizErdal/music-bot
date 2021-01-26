module.exports = {
    name: 'clear',
    aliases: ['c'],
    category: 'Music',
    utilisation: '{prefix}clear',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));
        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(new MessageEmbed().setDescription(`Müzik kuyruğunda sadece bir şarkı var.`));
        client.player.clearQueue(message);
        message.react("👌");
    },
};