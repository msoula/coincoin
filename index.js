'use strict';

const Discord = require('discord.js');
const request = require('request');

const BOT_NAME = 'cc-meow';

const client = new Discord.Client({
    // partial configuration required to enable direct messages
    partials: ["CHANNEL", "MESSAGE"],
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
client.on('messageCreate', function(message) {
    if (!message.content.toLowerCase().startsWith('!meow')) return;
    if (message.author.bot) return;

    var options = {
        url: 'https://api.thecatapi.com/v1/images/search?mime_types=gif',
        method: 'get',
        json: true
    };

    request(options, (error, response, data) => {
        if (error) {
            message.channel.send('Aie, je suis cassé :scream_cat:');
        } else if (200 > response.statusCode || 299 < response.statusCode) {
            message.channel.send('Aie, je suis cassé :scream_cat:');
        } else {
            if (!data.length) {
                message.channel.send('Aie, je suis cassé :scream_cat:');
            } else {
                let str = 'Meow';
                for (let idx = 0, times = 0 | Math.random()*4; idx < times; ++idx) {
                    str += ' meow';
                }

                let response = new Discord.MessageEmbed()
                    .setDescription(str)
                    .setImage(data[0].url)
                message.channel.send({embeds: [response]})
            }
        }
    });
    message.delete().then(() => {}).catch(console.error);


});
client.login(process.env.BOT_TOKEN);

// vim: set ts=4 sw=4 expandtab:
