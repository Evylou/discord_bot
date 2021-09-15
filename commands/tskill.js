const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('tskill')
    .setDescription('Set of commands about trade skills.')
    ,
    async execute(interaction) {
        await interaction.reply(`In progress.`)
    }
}