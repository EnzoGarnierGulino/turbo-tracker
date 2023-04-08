const getToken = require('./bot_credentials.js');
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: []
});
const serverID = 1048367362098872360;

function botLogin() {
    client.login(getToken);
    client.once("ready", () => {
        console.log("Bot is working !");
        getNumberOfMembers(serverID);
    })
}

function getNumberOfMembers(serverID) {
    let guild = client.guilds.cache.get(serverID);
    return guild.memberCount;
}

botLogin();
getNumberOfMembers(serverID);