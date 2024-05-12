const fs = require('fs');

function readConfig() {
    try {
        const configFile = fs.readFileSync('./Config.log', 'utf8');
        const lines = configFile.split('\n');
        const cfg = {};

        lines.forEach(line => {
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

const config = readConfig();
let deleteMessage = config.DeleteMessagesAfterPosted;
let deleteMessageCooldown = config.DeleteMessagesDuration;

function sendMessage(message, content) {
    try {
        if (deleteMessage) {
            message.channel.send(content)
                .then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, deleteMessageCooldown);
                });
        } else {
            message.channel.send(content);
        };
    } catch (error) {
        console.error("Error in AntiReportSystem {sendMessage}:", error);
    }
}

module.exports = { sendMessage };
