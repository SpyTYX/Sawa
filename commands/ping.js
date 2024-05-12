const { sendMessage } = require('../utils');
const fs = require('fs');
const path = require('path');
const config = readConfig();

module.exports = {
    name: 'ping',
    description: 'Get the latency of the bot.',
    aliases: ['latency'],
    execute(message, args) {
        if (!isUserWhitelisted(message.author.id)) {
            if (config.NotAuthorizedMessage) {
                sendMessage(message, "`SawaSB > You are not authorized to use this command.`")
            }
            return;
        }
        
        const infoData = readInfoData();
        const botName = infoData.Name || 'SawaSB';
    
        message.channel.send('`> ' + botName + ' is thinking...`').then(sent => {
            sent.edit('`' + botName + ' > Pong! Latency is ' + (sent.createdTimestamp - message.createdTimestamp) + 'ms.`');
        });
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
        const configFile = fs.readFileSync('./config.log', 'utf8');
        const lines = configFile.split('\n');
        const cfg = {};

        lines.forEach(line => {
            if (line.trim() === '') {
                return;
            }
            const [key, value] = line.trim().split(/\s+/);
            cfg[key] = value === 'true' || value === 'false' ? value === 'true' : value;
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
