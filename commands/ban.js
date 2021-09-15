const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('ban')
    .setDescription('Bans the mentionned user.')
    .addUserOption(tagged_user =>
        tagged_user.setName('tagged_user')
        .setDescription('User that will be banned.')
        .setRequired(true))
    .addStringOption(reason =>
        reason.setName('reason')
        .setDescription('Optional reason for the ban.')
        .setRequired(true))
    ,
    async execute(interaction) {
        const tagged_user = interaction.options.getUser('tagged_user')
        const reason = interaction.options.getString('reason')
        await interaction.guild.members.ban(tagged_user, {reason: reason})
        console.log(`${interaction.member} banned ${tagged_user} from ${interaction.guild} for \"${reason}\".`)
        await interaction.reply(`Successfully banned ${tagged_user}.`)
    }
}