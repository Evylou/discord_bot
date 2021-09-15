module.exports = {
    name : 'guildMemberAdd',
    once : false,
    execute(guildMember) {
        guildMember.roles.add(m_data.roles.Guest)
    }
}