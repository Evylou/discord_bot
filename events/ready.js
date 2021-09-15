module.exports = {
    name : 'ready',
    once : true,
    execute(client) {
        console.log('I now sense.')
        client.user.setPresence({status : 'online'})
    }
}