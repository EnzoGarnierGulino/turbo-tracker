const Discord = require("discord.js");
const client = new Discord.Client({
    intents: []
});
const getToken = require('./bot_credentials.js');

function botLogin() {
    client.login(getToken);

    client.once("ready", () => {
        console.log("Bot working !");
    })
}

module.exports = botLogin;