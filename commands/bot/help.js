module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Bot',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: `${client.user.username}` },
                    fields: [
                        { name: 'Müzik', value: music },
                        { name: 'Filtreler', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `Filtreleri kullanmak için, ${client.config.prefix}filter (filtre). Örnek: ${client.config.prefix}filter 8D.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
            if (!command) return message.channel.send(`Bu komutu bulamadım!`);

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: `${client.user.username}` },
                    fields: [
                        { name: 'İsim', value: command.name, inline: true },
                        { name: 'Kategori', value: command.category, inline: true },
                        { name: 'Alternatifler', value: command.aliases.length < 1 ? 'Yok' : command.aliases.join(', '), inline: true },
                        { name: 'Kullanım', value: command.utilisation.replace('{prefix}', client.config.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                }
            });
        };
    },
};