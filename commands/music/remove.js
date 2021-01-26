module.exports = {
    name: 'remove',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}remove [number]',

    execute(client, message, args) {
        const { MessageEmbed } = require('discord.js');
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Ses kanalında değilsiniz!`));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(new MessageEmbed().setDescription(`Aynı ses kanalında değilsiniz!`));
        const queue = client.player.getQueue(message);
        if (!queue) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalan şarkı yok!`));
        if (queue.tracks.length < 2) return message.channel.send(new MessageEmbed().setDescription(`Müzik kuyruğundan kaldırılacak müzik yok!`));
        let miktar = parseInt(args[0]) - 1
        if (!args[0]) return message.channel.send(new MessageEmbed().setDescription(`Yanlış kullanım. Doğru kullanım: **\`${client.config.prefix}remove sayı\`** 1 ile ${queue.tracks.length} arasında.`))
        if (isNaN(args[0])) return message.channel.send(new MessageEmbed().setDescription(`Geçersiz numara. \nLütfen 1 ile ${queue.tracks.length} arasında sıra numarası kullanın`))
        if (Number(args[0]) === 0 || Number(args[0]) === 1) return message.channel.send(new MessageEmbed().setDescription(`Zaten çalmakta olduğum bir şarkıyı kaldıramıyorum. \nLütfen 1 ile ${queue.tracks.length} arasındaki sıra numarasını kullanın`))
        if (Number(miktar) >= queue.tracks.length || Number(args[0]) < 1 || !queue.tracks[miktar]) return message.channel.send(new MessageEmbed().setDescription(`Şarkı bulunamadı.\nLütfen 1 ile ${queue.tracks.length} arasında sıra numarası kullanın`))
        
        const song = queue.tracks[Number(miktar)];
        client.player.remove(message, Number(miktar));
        message.channel.send(new MessageEmbed().setDescription(`[${song.title}](${song.url}) kuyruktan kaldırıldı!`));
    },
};