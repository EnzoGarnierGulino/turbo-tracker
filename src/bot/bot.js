const getToken = require('./bot_credentials.js');
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: []
});
const serverID = 1048367362098872360;

async function botLogin() {
    await client.login(getToken);
}

async function getNumberOfMembers(serverID) {
    const server = await client.guilds.cache.get(serverID);
    return server.memberCount;
}

botLogin()
getNumberOfMembers(serverID);