var token = process.env.token

if(!token) {
    process.exit(1)
}

const Discord = require('discord.js')
var client = new Discord.Client()
client.login(token)
client.on('ready', () => {
    console.log('RazrBot ready.')
    var guild = client.guilds.find('name', 'RazrNet')
    if(client.channels.find('name', 'logs') === null) {
        guild.createChannel('logs', 'text')
    }

    // Logs voice channel movements on the server
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        let logMessage = ''
        logMessage += "<@" + oldMember.user.id + ">"
        logMessage += ' vient de '
        if(oldMember.voiceChannelID) {
            if(newMember.voiceChannelID) {
                logMessage += 'passer du canal \"'
                logMessage += client.channels.get(oldMember.voiceChannelID).name
                logMessage += '\" '
                logMessage += 'au canal \"'
                logMessage += client.channels.get(newMember.voiceChannelID).name
                logMessage += '\".'
            } else {
                logMessage += 'quitter le canal \"'
                logMessage += client.channels.get(oldMember.voiceChannelID).name
                logMessage += '\".'
            }
        } else {
            if(newMember.voiceChannelID) {
                logMessage += 'rejoindre le canal \"'
                logMessage += client.channels.get(newMember.voiceChannelID).name
                logMessage += '\".'
            } else {
                logMessage += "bugger as f*ck."
            }
        }
        logMessage += " (" + getNow() + ")"
        let logsChannel = client.channels.find('name', 'logs')
        if(logsChannel) {
            client.channels.find('name', 'logs').send(logMessage)
        } else {
            console.log('\"logs\" channel not found');
        }
    })

    // Poke users
    client.on('message', message => {
        if (message.content.startsWith('!poke')) {
            let msg = message.content
            let poker = message.author.id
            let pokedUser
            let userRegExp = /<@(\d{18})>/
            if(userRegExp.test(msg)) {
                pokedUser = userRegExp.exec(msg)
            }

            let pokeMessage = ''
            pokeMessage += '<@' + poker + '> '
            pokeMessage += 'vous a poké sur le channel '
            pokeMessage += '<#414823364532633600>'

            guild.members.get(pokedUser[1]).createDM().then((DMChannel) => {
                DMChannel.send(pokeMessage)
            })
        }
    })
})

function getNow() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if(day < 10) {
        day = '0' + day
    }
    if(month < 10) {
        month = '0' + month
    }
    if(hours < 10) {
        hours = '0' + hours
    }
    if(minutes < 10) {
        minutes = '0' + minutes
    }
    if(seconds < 10) {
        seconds = '0' + seconds
    }

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
}
