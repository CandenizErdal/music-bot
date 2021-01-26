module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));
        client.player.setRepeatMode(message, false);
        client.player.stop(message);
        message.react("🛑");
    },
};