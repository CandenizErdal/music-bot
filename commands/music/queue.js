module.exports = {
    name: 'queue',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        const queue = client.player.getQueue(message);
        if (!queue) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalan şarkı yok!`));
        
        message.channel.send(new MessageEmbed()
        .setAuthor(`Müzik Kuyruğu - ${message.guild.name}`)
        .setFooter(`Kuyrukta toplam ${queue.tracks.length} şarkı mevcut | ${client.player.getQueue(message).repeatMode ? 'Döngü: ✅' : 'Döngü: ❌'} | ${client.player.getQueue(message).loopMode ? 'Kuyruk Döngüsü: ✅' : 'Kuyruk Döngüsü: ❌'}`)
        .setDescription(`\n**Şuan Çalan:** [${queue.playing.title}](${queue.playing.url})\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - [${track.title}](${track.url}) [${track.requestedBy}]`
        }).slice(0, 5).join('\n') + `\n\n`)));
    },
};