const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('clear')
    .setDescription('Delete n message from the current channel (0 < n < 101).')
    .addIntegerOption(n =>
        n.setName('n')
        .setDescription('Number of messages tha will be deleted.')
        .setRequired(true))
    ,
    async execute(interaction) {
        const n = interaction.options.getInteger('n')
        if (n < 1 || n > 100)
            return interaction.reply('n must be between 1 and 100 !')
        await interaction.channel.bulkDelete(n)
        await interaction.reply({content : `Successfully deleted ${n} message(s)`, ephemeral : true})
    }
}