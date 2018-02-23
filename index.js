// Discord bot token used to log in... Discord! Great!
var token = process.env.token // Please enter your bot token on Heroku

// L is short for Lang
var L = process.env.lang || 'en'

// Your server name
var guildName = process.env.guildName || 'RazrNet' // PLEASE ENTER YOUR GUILD NAME ON HEROKU

// The chan name where all the logs are send to
var logsChannelName = process.env.logsChannelName || 'logs' // DO I LOOK LIKE I\'M JOKING?!

if(!token) {
    process.exit(1)
}

var l = require('./lang.json')

// YES YES BAD SEMANTIC OR WHATEVER I DON'T CARE BECAUSE IT LOOKS CLEANER IN THE CODE LIKE THIS

const Discord = require('discord.js')
var client = new Discord.Client()
client.login(token)
client.on('ready', () => {
    console.log('RazrBot ready.')
    var guild = client.guilds.find('name', guildName)
    if(client.channels.find('name', logsChannelName) === null) {
        guild.createChannel(logsChannelName, 'text')
    }



    // Logs voice channel movements on the server
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        let logMessage = ''
        logMessage += "<@" + oldMember.user.id + "> "
        logMessage += l[L].just
        if(oldMember.voiceChannelID) {
            if(newMember.voiceChannelID) {
                logMessage += l[L].fromChan
                logMessage += client.channels.get(oldMember.voiceChannelID).name
                logMessage += l[L].toChan
                logMessage += client.channels.get(newMember.voiceChannelID).name
                logMessage += '\".'
            } else {
                logMessage += l[L].quitChan
                logMessage += client.channels.get(oldMember.voiceChannelID).name
                logMessage += '\".'
            }
        } else {
            if(newMember.voiceChannelID) {
                logMessage += l[L].joinChan
                logMessage += client.channels.get(newMember.voiceChannelID).name
                logMessage += '\".'
            } else {
                logMessage += l[L].buggedAF
            }
        }
        logMessage += " (" + getNow() + ")"
        let logsChannel = client.channels.find('name', logsChannelName)
        if(logsChannel) {
            client.channels.find('name', logsChannelName).send(logMessage)
        } else {
            console.log('\"logs\" channel not found');
        }
    })

    // Poke users
    client.on('message', message => {
        if (message.content.startsWith('!poke') && message.mentions && message.mentions.users) {
            message.mentions.users.forEach(user => {
                let pokeMessage = ''
                pokeMessage += '<@' + message.author.id + '> '
                pokeMessage += l[L].pokedYouOnChan
                pokeMessage += '<#' + message.channel.id + '>'

                guild.members.get(user.id).createDM().then((DMChannel) => {
                    DMChannel.send(pokeMessage)
                })
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
