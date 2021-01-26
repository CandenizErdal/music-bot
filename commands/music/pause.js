module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));
        if (client.player.getQueue(message).paused) return message.channel.send(new MessageEmbed().setDescription(`Müzik zaten duraklatılmış!`));
        client.player.pause(message);
        message.react("⏸️");
    },
};