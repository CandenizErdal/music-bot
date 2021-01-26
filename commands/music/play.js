module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    execute(client, message, args) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!args[0]) return message.channel.send(new MessageEmbed().setDescription(`Lütfen bir şarkının adını belirtin!`));
        client.player.play(message, args.join(" "), { firstResult: true });
    },
};