const fs = require('fs')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
require('dotenv').config()

const commands = []
const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of command_files) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '9'}).setToken(process.env.token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(process.env.client_Id, process.env.server_id),
            { body: commands },
		)
		console.log('Successfully registered application commands.')
	} catch (error) {
		console.error(error)
	}
})()