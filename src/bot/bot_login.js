// AppID = 1094373677769961543
// Public Key = f83b24cd047da011467877bd609ed61ee06553a8e47c37840ed92a4e228bae1c
// Private Key = ZSOxfBF7sXS1QYmA3fAv7VPhwjDl_dnJ
// Token : MTA5NDM3MzY3Nzc2OTk2MTU0Mw.GaELmn.Wvwf8ANNQE0InTXBGfiGHnkxVfm-Zel5Z98wYE

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