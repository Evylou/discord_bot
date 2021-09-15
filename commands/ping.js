const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('ping')
    .setDescription('Simple ping pong.'),
    async execute(interaction) {
        await interaction.reply(`Pong ! (${interaction.client.ws.ping} ms)`)
    }
}