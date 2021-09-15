const permissions = require('../data.json').commands

module.exports = function security_check(interaction, command) {
    if (!permissions[command].channels.includes(interaction.channelId) && permissions[command].channels.length != 0) {
        interaction.reply({content: 'Invalid channel permissions.', ephemeral: true})
        return false
    }
    if (!interaction.member.permissions.has(permissions[command].user_perms) && permissions[command].user_perms.length != 0) {
        interaction.reply({content: 'Invalid user permissions.', ephemeral: true})
        return (false)
    }
    if (!interaction.member.roles.cache.has(permissions[command].roles) && permissions[command].roles.length != 0) {
        interaction.reply({content: 'Invalid user roles.', ephemeral: true})
        return (false)
    }
    return (true)
}