[![sup](https://cdn.discordapp.com/attachments/1224126652699643994/1246928342817444022/sawa_logo.png?ex=665e2c03&is=665cda83&hm=43499f33319fff6525449e58066a7999e6f78c6690f130965b0995f5b20fdb88&)]()

# Sawa Client Bot
#### Sawa (SawaSB / Sawa Self Bot) is a reliable Discord self-bot with frequent updates and high customization.
#### I am not responsible if you got your account terminated or TOS'ed because you used the self-bot.
#### The bot currently has 5+ commands, with more to come in future updates.
#### (Note: Each command is able to configured inside of config.log, which also houses the bot's main files such as prefix, AntiReportSystem, etc.)
#### ㅤ
#### ㅤ
## 01. Configuration
#### Inside of SawaSB's folder, there is a .log file named "config". This file controls how the commands & the bot behave. Your default config file should look like this:
```txt
// Last Updateed: 12/05/2024
// Main Bot Configuration
ClientToken TOKEN_HERE
Prefix sw!
DeleteMessagesAfterPosted false
DeleteMessagesDuration 4500
NotAuthorizedMessage false

// Enable or Disable Commands
BanWave true
Information true
LoopPing true
Ping true
Test false

// Command Configuration
LoopPingCooldown 500
BanWaveCooldown 4500
```
#### (Note: Blank lines & Lines that start with "//" or "--" are automatically ignored, these act as comments.)
#### Let's run a break-down through the configuration file and mention what each component does.
#### ㅤ
## 01.1. Installing
#### ㅤ
#### Installing SawaSB is simple, download "SawaOfficial.zip" from [Releases](https://github.com/SpyTYX/Sawa/releases/)
#### Once the download is complete, extract the .zip file using [7Zip](https://www.7-zip.org) or [WinRar](https://www.win-rar.com/start.html?&L=0)
#### In order to make sure Sawa runs smoothly and perfectly, install [NodeJS](https://nodejs.org/en)
#### Once you have downloaded everything, run "index.js" using NodeJS. (Using [Visual Studio Code's](https://code.visualstudio.com) debug interface to run it is recommended.)
#### ㅤ
## 01.2. Bot Configuration
#### ㅤ
- ClientToken (Default: TOKEN_HERE):
- - This acts as your login information, it allows the bot to connect to your discord account without the need of your username or password and also bypasses 2FA.
- - It is required to make sure the bot works.
- - (For more information on how you can get your Client Token watch this video: [Click Me!](https://www.youtube.com/watch?v=YEgFvgg7ZPI&t=2s))
#### ㅤ
- Prefix (Default: sw!):
- - This is the prefix of the bot, it allows the bot to detect whenever you are trying to run a command.
- - Setting this value to something like "?" will make it so you will need to use "?" at the start of a text whenever you are running a command.
- - (e.g: ?help)
#### ㅤ
- DeleteMessagesAfterPosted (Default: true):
- - This is a boolean (must be "true" or "false"). It is a security measure to make sure people don't report you and get your account TOS'ed or Terminated. (As Client Bots are against Discord TOS.)
#### ㅤ
- DeleteMessagesDuration (Default: 4500):
- - This component is a sub-component of "DeleteMessagesAfterPosted", if its false this won't work.
- - This component controls how much time must pass in miliseconds before a message is deleten. (1 second = 1000ms)
#### ㅤ
- NotAuthorizedMessage (Default: false):
- - This is a boolean ("true or "false"). It controls if the bot should send a message whenever a person who is not whitelisted runs a command.
- - (Note: People can spam this and cause you to rate limited and have high ping.)
#### ㅤ
## 01.2. Enabling or Disabling Commands
#### (Note: Every value here must be either "true" or "false" otherwise it will error.)
#### ㅤ
- Ban Wave (Default: true):
- - Enable the "Ban Wave" command which allows you to get people off a list and automatically ban them.
#### ㅤ
- Information (Default: true):
- - Enable the "Information" command which allows you to get information about the bot & the client.
#### ㅤ
- Loop Ping (Default: true):
- - Enable the "Loop Ping" command which allows you to mass ping someone.
#### ㅤ
- Ping (Default: true):
- - Enable the "Ping" command which allows you to get the latency of the bot & client to the Discord servers.
#### ㅤ
- Test (Default: false):
- - Enable the "Test" command which does nothing. (This is a development command used for testing commands, does nothing on public releases.)
#### ㅤ
## 01.3. Command Configuration
#### ㅤ
- LoopPingCooldown (Default: 500):
- - Set the duration between pings of loop ping in miliseconds. (Setting really low values will lead to being rate-limited.)
- - (1 second = 1000 miliseconds)
#### ㅤ
- BanWaveCooldown (Default: 4500):
- - Set the duration between ban commands in miliseconds. (Setting really low values will lead to being rate-limited.)
- - (1 second = 1000 miliseconds)
#### ㅤ
#### ㅤ
## This Project is licensed under [The Open Software License 3.0](https://en.wikipedia.org/wiki/Open_Software_License)
#### You are allowed to use code from this project or modify the project to your needs with the terms of providing credits to the Authors (moonzy.dev) and providing a link to the project (https://github.com/SpyTYX/Sawa/)
#### You are not allowed to add any sort of malware or virus into the project and trick people into running the malware in order to steal their information. (RATs / Loggers, aswell as any other type of Logging or Malware.)
#### You are not allowed to sell or make a premium version of any project with code from this project.
