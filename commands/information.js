const { sendMessage } = require('../utils');
const fs = require('fs');
const path = require('path');

let intervalId;

module.exports = { 
    name: 'loopping',
    description: 'Continously ping an user.',
    aliases: ['sping', 'lping', 'spamping'],
    execute(message, args) {
        if (!isUserWhitelisted(message.author.id)) {
            if (config.NotAuthorizedMessage) {
                sendMessage(message, "`SawaSB > You are not authorized to use this command.`")
            }
            return;
        }

        if (args.length === 0) {
            sendMessage(message, "`SawaSB > Please specify a command. Usage: loopping <start|stop>`")
            return;
        }
    
        const command = args.shift().toLowerCase();
        
        switch (command) {
            case 'start':
                startLoopPing(message, args);
                break;
            case 'stop':
            case 'terminate':
            case 'prune':
                stopLoopPing(message);
                break;
            default:
                sendMessage(message, "`SawaSB > Invalid command. Usage: loopping <start|stop>`")
                break;
        }
    },
};

function startLoopPing(message, args) {
    if (intervalId) {
        sendMessage(message, "`SawaSB > An instance of Loop Ping is already running, terminate it first before running the command!`")
        return;
    }
    console.log('Args:', args);

    if (args.length !== 1 || !/^\d+$/.test(args[0])) {
        sendMessage(message, "`SawaSB > Correct Usage: loopping start <userID>`")
        return;
    }

    const userId = args[0];
    intervalId = setInterval(() => {
        message.channel.send(`<@${userId}>`).catch(console.error);
    }, 500);
}

function stopLoopPing(message) {
    if (!intervalId) {
        sendMessage(message, "`SawaSB > The bot is currently not loop pinging anyone.`")
        return;
    }

    clearInterval(intervalId);
    intervalId = null;
    sendMessage(message, "`SawaSB > Loop Ping instance terminated.`")
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
