const on_join_role = require('../data.json').on_join_role

module.exports = {
    name : 'guildMemberAdd',
    once : false,
    execute(guildMember) {
        guildMember.roles.add(on_join_role)
    }
}