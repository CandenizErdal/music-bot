const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: 'lyrics',
  aliases: [],
  category: 'Music',
  utilisation: '{prefix}lyrics',

  async execute(client, message) {
    const queue = client.player.getQueue(message);
    if (!queue) return message.channel.send(new MessageEmbed().setDescription(`Şu anda çalınan müzik yok!`));
    const track = client.player.nowPlaying(message);
    
    let lyrics = null;

    try {
      lyrics = await lyricsFinder(track.title, "");
      if (!lyrics) lyrics = `${track.title} için şarkı sözü bulunamadı.`;
    } catch (error) {
      lyrics = `${track.title} için şarkı sözü bulunamadı.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${track.title} — Sözler`)
      .setDescription(lyrics)
      .setColor("RANDOM")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};