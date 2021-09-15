const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('kick')
    .setDescription('Kicks the mentionned user.')
    .addUserOption(tagged_user =>
        tagged_user.setName('tagged_user')
        .setDescription('User that will be kicked.')
        .setRequired(true))
    .addStringOption(reason =>
        reason.setName('reason')
        .setDescription('Optional reason for the kick.')
        .setRequired(true))
    ,
    async execute(interaction) {
        const tagged_user = interaction.options.getMember('tagged_user')
        const reason = interaction.options.getString('reason')
        await tagged_user.kick(reason)
        console.log(`${interaction.member} kicked ${tagged_user} for \"${reason}\".`)
        await interaction.reply(`Successfully kicked ${tagged_user}.`)
    }
}