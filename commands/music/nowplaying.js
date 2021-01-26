module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));

        const track = client.player.nowPlaying(message);
        const filters = [];
        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;


message.channel.send(new MessageEmbed()
.setDescription(`
[${track.title}](${track.url}) [${track.requestedBy}]
${client.player.createProgressBar(message, { timecodes: true })}
`)
.setFooter(`Filtreler: ${filters.length + '/' + client.filters.length}`)
.setTimestamp()
)

    },
};