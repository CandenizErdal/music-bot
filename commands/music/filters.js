module.exports = {
    name: 'filters',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filters',

    execute(client, message) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        if (!client.player.getQueue(message)) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? 'Açık' : 'Kapalı'));
        });

        message.channel.send({
            embed: {
                color: 'RANDOM',
                fields: [
                    { name: 'Filtreler', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `Etkinleştirilen veya devre dışı bırakılan tüm filtrelerin listesi. \n Bir şarkıya filtre eklemek için \`${client.config.prefix}filter\` kullanın.`,
            },
        });
    },
};