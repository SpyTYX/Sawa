const { sendMessage } = require('../utils');
const fs = require('fs');
const path = require('path');

let intervalId;

const defaultReasons = {
    def1: 'Botted Advertisement. | STEAM SCAM',
    def2: 'Botted Advertisement. | NSFW SERVER',
    def3: 'Botted Advertisement. | NSFW SERVER, PEDOPHILIA',
};        

module.exports = { 
    name: 'banwave',
    description: 'Ban users listed in a ban wave file.',
    aliases: ['judgement'],
    execute(message, args) {
        if (!isUserWhitelisted(message.author.id)) {
            if (config.NotAuthorizedMessage) {
                sendMessage(message, "`SawaSB > You are not authorized to use this command.`")
            }
            return;
        }

        if (args.length === 0) {
            sendMessage(message, "`SawaSB > Please specify a command. Usage: banwave <start|stop|delete>`")
            return;
        }
    
        const command = args.shift().toLowerCase();
        
        switch (command) {
            case 'start':
                startBanWave(message, args);
                break;
            case 'stop':
            case 'terminate':
            case 'prune':
                stopBanWave(message);
                break;
            case 'delete':
            case 'remove':
            case 'destroy':
                deleteBanWave(message, args);
                break;
            default:
                sendMessage(message, "`SawaSB > Invalid command. Usage: banwave <start|stop|delete>`")
                break;
        }
    },
};

function startBanWave(message, args) {
    if (intervalId) {
        sendMessage(message, "`SawaSB > A ban wave is already running, terminate it to continue!`")
        return;
    }

    if (args.length !== 1) {
        sendMessage(message, "`SawaSB > Correct Usage: banwave start <filename>`")
        return;
    }

    const filename = args[0];
    const filePath = path.join(__dirname, '..', 'assets', 'ban_wave', filename);

    if (!fs.existsSync(filePath)) {
        sendMessage(message, "`SawaSB > File not found.`")
        return;
    }

    const fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
    let index = 0;

    intervalId = setInterval(() => {
        const line = fileLines[index];
        if (!line) {
            clearInterval(intervalId);
            intervalId = null;
            sendMessage(message, "`SawaSB > Ban wave is over.`")
            return;
        }

        const [userId, reasonIdentifier] = line.split(', ');
        if (!userId || !reasonIdentifier) {
            index++;
            return;
        }

        const reason = defaultReasons[reasonIdentifier.trim().toLowerCase()] || reasonIdentifier;
        message.channel.send(`?ban ${userId} ${reason}`).catch(console.error)

        index++;
    }, 4000);
}

function stopBanWave(message) {
    if (!intervalId) {
        sendMessage(message, "`SawaSB > No ban wave is currently running.`")
        return;
    }

    clearInterval(intervalId);
    intervalId = null;
    sendMessage(message, "`SawaSB > Ban wave has been successfully terminated.`")
}

function deleteBanWave(message, args) {
    if (args.length !== 1) {
        sendMessage(message, "`SawaSB > Correct Usage: banwave delete <filename>`")
        return;
    }

    const filename = args[0];
    const filePath = path.join(__dirname, '..', 'assets', 'ban_wave', filename);

    if (!fs.existsSync(filePath)) {
        sendMessage(message, "`SawaSB > File not found.`")
        return;
    }

    fs.unlinkSync(filePath);
    sendMessage(message, "`SawaSB > File has been deleted.`")
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
