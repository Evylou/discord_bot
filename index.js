const Discord = require('discord.js')
const { Permissions } = require('discord.js')
const data = require('./data.json')
const token = require('./token.json')

const client = new Discord.Client()

const french_job_names = ['Fabrication d\'armes', 'Fabrication d\'armures', 'Ingénierie', 'Joaillerie', 'Arts obscurs', 'Cuisine', 'Ameublement', 'Fonderie', 'Menuiserie', 'Tannerie', 'Tissage', 'Taille de pierre', 'Abattage', 'Extraire', 'Pêche', 'Récolte', 'Pistage et dépeçage']

client.login(token.token)

client.once('ready', () => {
	console.log('started')
    client.user.setActivity(data.prefix + 'help', {type: 'WATCHING'})
});

const functions = [
    ['ping', [ping, [data.channels.commands], [], []], 'Simple ping pong test.','[ !ping ]'],
    ['kick', [kick, [data.channels.commands], [Permissions.FLAGS.KICK_MEMBERS], []], 'Kicks the tagged user if allowed.','[ !kick @User ]'],
    ['ban', [ban, [data.channels.commands], [Permissions.FLAGS.BAN_MEMBERS], []], 'Bans the tagged user if allowed.','[ !ban @User ]'],
    ['tskill', [tskill, [data.channels.commands], [], data.roles.Member], 'Give yourself trade skills related roles (50-99 -> Apprentice, 100-149 -> Expert, 150+ -> Master).','[ !tskill example level ] where :\n\t\t{ example } is a valid trade skill.\n\n\t\t{ level } is your level in this skill.\n\n\t[ !tskill list ] can be used to list all trade skill designations.\n\t[ !tskill reset ] can be used to remove all trade skill roles.'],
    ['clear', [clear, [], [Permissions.FLAGS.MANAGE_MESSAGES], []], 'Delete x message in the chat (between 1 and 100).','[ !clear x ]'],
    ['help', [help, [data.channels.commands], [], []], 'Display help about given command.','[ !help command ]'],
    ['list', [list, [data.channels.commands], [], []], 'Lists all the available commands.','[ !list ]'],
    ['member', [member, [data.channels.commands], [Permissions.FLAGS.MANAGE_ROLES], []], 'Up tagged user to member role.', '[ !member @user ]']
]

client.on('guildMemberAdd', (guildMember) => {
    guildMember.roles.add(data.roles.Guest)
})

client.on('message', message => {
    if (!message.content.startsWith(data.prefix))
        return
    const args = message.content.slice(data.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    var has_exec = new Boolean(false)
    functions.forEach(function(tmp_function) {
        if (command === tmp_function[0]) {
            if (is_command_allowed(message, tmp_function[1]) == true)
                tmp_function[1][0](message, args)
            has_exec = true
        }
    })
    if (has_exec == false)
        message.channel.send('Invalid command.')
});

// --------------------------------------------------------
// --------------------------------------------------------

function is_command_allowed(message, perms) {
    if (perms[1].includes(message.channel.id) == false && perms[1] != '') {
        message.channel.send('Incorrect channel.')
        return false
    }
    if (message.member.permissions.has(perms[2]) == false) {
        message.channel.send('You don\'t have the required permissions to do this.')
        return false
    }
    if (message.member.roles.cache.has(perms[3]) == false && perms[3] != '') {
        message.channel.send('You don\'t have the required roles to do this.')
        return false
    }
    return true
}

// --------------------------------------------------------
// --------------------------------------------------------

function ping(message, arg) {
    message.channel.send('Pong.')
}

// --------------------------------------------------------

function kick(message, args) {
    if (!message.mentions.users.size)
        return message.reply('You need to tag an user in order to kick them.')
    const user = message.mentions.users.first()
    const member = message.guild.member(user)
    if (member) {
        member
        .kick(args.join(' '))
        .then(() => {
            message.reply('Successsfully kicked ' + user.tag + '.')
        })
        .catch(err => {
            message.reply('Unable to kick' + user.tag + ' because of ' + err + '.')
            console.error(err)
        });
    } else message.reply('User not in this guild.')
}

// --------------------------------------------------------

function ban(message, args) {
    if (!message.mentions.users.size)
        return message.reply('You need to tag an user in order to ban them.')
    const user = message.mentions.users.first()
    const member = message.guild.member(user)
    if (member) {
        member
        .ban({
            reason: args.join(' ')
        })
        .then(() => {
            message.reply('Successsfully banned ' + user.tag + '.')
        })
        .catch(err => {
            message.reply('Unable to ban' + user.tag + ' because of ' + err + '.')
            console.error(err)
        })
    } else message.reply('User not in this guild.')
}

// --------------------------------------------------------

function tskill(message, args) {

    if (args.length == 1)
        if (args[0] === 'reset') {
            var all_jobs = new Array()
            data.jobs.forEach(function(tmp_job) {
                all_jobs = all_jobs.concat(tmp_job[1])
            })
            message.member.roles.remove(all_jobs)
            return message.channel.send('All trade skill roles have been removed.')
        }
        if (args[0] === 'list') {
            var all_jobs = new Array('Lists of all trade skill designation :')
            data.jobs.forEach(function(tmp_job, index) {
                all_jobs = all_jobs.concat('\n\t' + french_job_names[index] + ' => ' + tmp_job[0])
            })
            return message.channel.send(all_jobs)
        }

    if (args.length != 2)
        return message.channel.send('Invalid argument number. Try [ !help job ].')
    const level = new Number(args[1])
    if (isNaN(level))
        return message.channel.send('Second argument must be an integer. Try [ !help job ].')
    if (level < 0)
        return message.channel.send('Second argument has to be at least 1.')
    if (level > 999)
        return message.channel.send('Stop lying...')

    var recognized = new Boolean(false)
    var rec_job

    data.jobs.forEach(function(tmp_job) {
        if (args[0] === tmp_job[0] && recognized == false) {
            message.member.roles.remove(tmp_job[1])
            rec_job = (level < 100 ? (level < 50 ? [] : tmp_job[1][0]) : (level < 150 ? tmp_job[1][1] : tmp_job[1][2]))
            recognized = true
        }
    })
    if (recognized == true) {
        message.member.roles.add(rec_job)
        message.channel.send('Successfully added corresponding role.')
    }
    else message.channel.send('First argument has to be a matching trade skill. Try [ !job list ].')
}

// --------------------------------------------------------

function clear(message, args) {
    if (args.length != 1)
        return message.channel.send('Invalid argument number.')
    if (isNaN(Number(args[0])))
        return message.channel.send('Argument must be an integer.')
    if (Number(args[0]) < 1)
        return message.channel.send('Argument has to be positive non-null integer.')
    if (Number(args[0]) > 100)
        return message.channel.send('Cannot delete more than 100 messages.')
    return message.channel.bulkDelete(Number(args[0]))
}

// --------------------------------------------------------

function help(message, args) {
    if (args.length != 1)
        return message.channel.send('Invalid argument number. Try use [ !help help ]. And [ !list ]')
    var recognized = new Boolean(false)
    functions.forEach(function(tmp_func) {
        if (args[0] === tmp_func[0]) {
            message.channel.send(tmp_func[2] + "\n\t" + tmp_func[3])
            recognized = true
        }
    })
    if (recognized == false)
        message.channel.send('Couldn\'t find matching command. Try [ !list ]')
}

// --------------------------------------------------------

function list(message, args) {
    if (args.lenght > 0)
        return message.channel.send('This function accepts no arguments.')
    var complete_str = new String('List of all the commands :\n')
    functions.forEach(function(tmp_func) {
        complete_str = complete_str.concat('\t!' + tmp_func[0] + ' :\t' + tmp_func[2] + '\n\n')
    })
    return message.channel.send(complete_str)
}

// --------------------------------------------------------

function member(message, args) {
    if (args.lenght != 1)
        return message.channel.send('Invalid argument number.')
}

// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------