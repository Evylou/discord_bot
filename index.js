const fs = require('fs')
const {Client, Intents, Collection} = require('discord.js')
require('dotenv').config()

const my_intents = new Intents().add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS)
const client = new Client({intents: my_intents})
client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once)
        client.once(event.name, (...args) => event.execute(...args))
    else
        client.on(event.name, (...args) => event.execute(...args))
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.login(process.env.token)