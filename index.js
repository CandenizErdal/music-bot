const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone' });
const { Player } = require('discord-player');
const fs = require('fs');
client.player = new Player(client);
client.config = require('./config');
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

client.on('ready', async () => {
    client.user.setStatus("online");
    client.user.setActivity(`❤️ Candeniz`, { type: 'LISTENING'});
    console.log(`Bot Online!`);
})

client.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    const prefix = client.config.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (cmd) cmd.execute(client, message, args);
})

client.login(client.config.token);

// Player Events
client.player.on('channelEmpty', (message, queue) =>
message.channel.send(new discord.MessageEmbed().setDescription(`Ses kanalında başka üye olmadığından müzik durdu!`))
)

client.player.on('botDisconnect', (message) =>
message.channel.send(new discord.MessageEmbed().setDescription(`Kanalla bağlantım kesildiğinden müzik durdu!`))
)

client.player.on('trackStart', (message, track) => 
message.channel.send(new discord.MessageEmbed()
.setAuthor(`Şuan Çalınan`).setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`))
)

client.player.on('trackAdd', (message, queue, track) => 
message.channel.send(new discord.MessageEmbed()
.setAuthor(`Kuyruğa Eklendi`).setDescription(`[${track.title}](${track.url}) [${track.requestedBy}]`))
)

client.player.on('searchResults', (message, query, tracks) => 
message.channel.send(new discord.MessageEmbed()
.setAuthor(`${query} için arama sonuçları`).setFooter(`"iptal" yazarak aramayı iptal edebilirsiniz`).setDescription(`${tracks.slice(0, 10).map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`))
)

client.player.on('searchInvalidResponse', (message, query, tracks, content, collector) => {
if (content === 'iptal') {
    collector.stop();
    return message.channel.send(new discord.MessageEmbed().setDescription(`Seçim **iptal edildi**!`));
} else message.channel.send(new discord.MessageEmbed().setDescription(`** 1 ** ile **${tracks.length}** arasında geçerli bir numara göndermelisiniz!`));
})

client.player.on('searchCancel', (message, query, tracks) =>
message.channel.send(new discord.MessageEmbed().setDescription(`Geçerli bir yanıt sağlamadınız ... Lütfen komutu tekrar gönderin!`))
)

client.player.on('playlistAdd', (message, queue, playlist) =>
message.channel.send(new discord.MessageEmbed().setDescription(`[${playlist.title}](${playlist.url}) kuyruğa eklendi (**${playlist.tracks.length}** şarkı)`))
)

client.player.on('noResults', (message, query) =>
message.channel.send(new discord.MessageEmbed().setDescription(`${query} için YouTube'da hiçbir sonuç bulunamadı!`))
)

client.player.on('error', (error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(new discord.MessageEmbed().setDescription(`Bu sunucuda çalınan müzik yok!`));
            break;
        case 'NotConnected':
            message.channel.send(new discord.MessageEmbed().setDescription(`Herhangi bir ses kanalına bağlı değilsiniz!`));
            break;
        case 'UnableToJoin':
            message.channel.send(new discord.MessageEmbed().setDescription(`Ses kanalınıza katılamıyorum, lütfen izinlerimi kontrol edin!`));
            break;
        default:
            message.channel.send(new discord.MessageEmbed().setDescription(`Hata : ${error}`));
    }
})
// Player Events