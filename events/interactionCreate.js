const security_check = require('../functions/security_check.js')

module.exports = {
    name : 'interactionCreate',
    once : false,
    async execute(interaction) {
        if (!interaction.isCommand())
            return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command)
            return
        try {
            if (security_check(interaction, command.data.name))
                await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({content: 'An error occurred while executing the command. Please report it to @Evylou#7748.', ephemeral: true})
        }
    }
}