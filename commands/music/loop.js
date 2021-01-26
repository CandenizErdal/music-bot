module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    execute(client, message, args) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(new MessageEmbed().setDescription(`Tekrar modu **devre dışı**!`));
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(new MessageEmbed().setDescription(`Tekrar modu **etkin** tüm sıra sonsuza kadar tekrarlanacaktır!`));
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(new MessageEmbed().setDescription(`Tekrar modu **devre dışı**!`));
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(new MessageEmbed().setDescription(`Tekrar modu **etkin** mevcut müzik sonsuza kadar tekrarlanacaktır!`));
            };
        };
    },
};