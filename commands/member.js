const {SlashCommandBuilder} = require('@discordjs/builders')
const data = require('../data.json').commands.member

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName('member')
    .setDescription('Up the tagged user to member role.')
    .addUserOption(tagged_user =>
        tagged_user.setName('tagged_user')
        .setDescription('User that will be uppped.')
        .setRequired(true))
    ,
    async execute(interaction) {
        const tagged_user = interaction.options.getMember('tagged_user')
        await tagged_user.roles.add(data.added_role)
        await tagged_user.roles.remove(data.deleted_role)
        console.log(`${interaction.member} upped ${tagged_user} to member.`)
        await interaction.reply(`Successfully upped ${tagged_user} to member.`)
    }
}