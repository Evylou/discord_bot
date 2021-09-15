const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('roll')
    .setDescription('Rolls a n-sided dice.')
    .addIntegerOption(n =>
        n.setName('n')
        .setDescription('Number of faces the dice have.')
        .setRequired(true)),
    async execute(interaction) {
        const n = interaction.options.getInteger('n')
        if (n < 2)
            return interaction.reply('Dice must have at least 2 faces !')
        await interaction.reply(`You rolled a ${(Math.floor(Math.random() * n)) + 1} !`)
    }
}