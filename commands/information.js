const { sendMessage } = require('../utils');
const { Client, Collection } = require("discord.js-selfbot-v13");
const client = new Client();
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'information',
    description: 'Get some information about the client.',
    aliases: ['info', 'botinfo', 'clientinfo'],
    execute(message, args) {
        if (!isUserWhitelisted(message.author.id)) {
            if (config.NotAuthorizedMessage) {
                sendMessage(message, "`SawaSB > You are not authorized to use this command.`")
            }
            return;
        }
        
        const infoData = readInfoData();
        const botName = infoData.Name || 'SawaSB';
        const botVersion = `${infoData.Version} ${infoData.Build}`;
        const botAPI = `Running ${infoData.API} API`;
        const botLatency = message.client.ws.ping + 'ms';

        const userInfo = `
• CLIENT BOT INFORMATION •
${botName}
Version ${botVersion}
${botAPI}

Latency: ${botLatency}

• USER INFORMATION •

UserID: ${message.author.id}
Username: ${message.author.username}
SessionID: ${client.sessionId}
Ping: ${message.client.ws.ping}ms`;

        sendMessage(message, '```txt\n' + userInfo + '\n```');
    },
};

function readInfoData() {
    try {
        const data = fs.readFileSync('./info.log', 'utf8');
        const lines = data.split('\n');
        const infoData = {};

        lines.forEach(line => {
            const [item, value] = line.trim().split(' ');
            infoData[item] = value;
        });

        return infoData;
    } catch (err) {
        console.error('Error reading info file:', err);
        return {};
    }
}

function readConfig() {
    try {
        const configFile = fs.readFileSync('./Config.log', 'utf8');
        const lines = configFile.split('\n');
        const cfg = {};

        lines.forEach(line => {
            if (!line.trim()) {
                return;
            }

            if (line.trim().startsWith('//') || line.trim().startsWith('--')) {
                return;
            }

            const [key, ...value] = line.trim().split(/\s+/);
            cfg[key] = value.join(' ');
        });

        return cfg;
    } catch (err) {
        console.error('SawaSB > Error reading Config file:', err);
        return null;
    }
}

function isUserWhitelisted(userId) {
    try {
        const whitelistFilePath = path.join(__dirname, '..', 'assets', 'whitelist.log');
        if (!fs.existsSync(whitelistFilePath)) {
            console.error('Whitelist file not found.');
            return false;
        }

        const whitelistedUsers = fs.readFileSync(whitelistFilePath, 'utf8').split('\n');
        const cleanedWhitelistedUsers = whitelistedUsers.filter(user => user.trim() !== '');

        for (const user of cleanedWhitelistedUsers) {
            if (user === userId) {
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error('Error checking whitelist:', error);
        return false;
    }
}
