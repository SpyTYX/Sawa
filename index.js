const { Client, Collection } = require("discord.js-selfbot-v13");
const { sendMessage } = require('./utils');
const client = new Client();
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

let prefix;
const commands = new Collection();

function readData() {
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
        console.error('SawaSB > Error reading info file:', err);
        return null;
    }
}

function readConfig() {
    try {
        const configFile = fs.readFileSync('./Config.log', 'utf8');
        const lines = configFile.split('\n');
        const cfg = {};

        lines.forEach(line => {
            if (line.trim().startsWith('//') || line.trim().startsWith('--')) {
                return;
            }

            const [key, value] = line.trim().split(/\s+/);
            cfg[key] = value;
        });

        return cfg;
    } catch (err) {
        console.error('SawaSB > Error reading Config file:', err);
        return null;
    }
}

async function loadCommands() {
    try {
        const info = readData();
        const config = readConfig();
        const commandFiles = await readdir('./commands');
        
        for (const file of commandFiles) {
            if (file.endsWith('.js')) {
                const command = require(`./commands/${file}`);
                commands.set(command.name, command);
            }
        }

        console.log(`${info.Name} > Commands loaded successfully.`);
    } catch (error) {
        const info = readData();
        console.error(`${info.Name} > Error loading commands: ${error}`);
    }
}

// On-ready Event
client.on('ready', async () => {
    const info = readData();
    const config = readConfig();
    console.log(`${info.Name} | Client "${client.sessionId}" (${client.user.username}) is ready! | ${info.API} ${info.Version}`);

    prefix = config.Prefix;

    await loadCommands();
});

// Message Event
client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error('Error executing command:', error);
        message.reply('`SawaSB > There was an error while executing this command.`');
    }
});

const config = readConfig();
client.login(`${config.ClientToken}`);
