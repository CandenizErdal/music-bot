module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, message, args) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));
        if (!args[0] || isNaN(args[0]) || args[0] === 'Sonsuz') return message.channel.send(new MessageEmbed().setDescription(`Lütfen geçerli bir numara girin!`));
        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(new MessageEmbed().setDescription(`Lütfen geçerli bir sayı girin! (1 ile 100 arasında)`));
        client.player.setVolume(message, parseInt(args[0]));
        message.channel.send(new MessageEmbed().setDescription(`Ses seviyesi **${parseInt(args[0])}%**`));
    },
};