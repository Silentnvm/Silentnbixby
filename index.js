const Discord = require('discord.js')
const { prefix, token } = require("./config.json")
const client= new Discord.Client()



client.once('ready' ,() => {
    console.log(`${client.user.username} este on`)
})


client.on('message', message => {
    if(message.content.startsWith(`${prefix}kick`)) {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("```Nu ai permisiunea sa folosesti aceasta comanda!```")
        }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("**Nu am permisiunea pentru a folosi aceasta comanda!**")
        }
        let target = message.mentions.members.first();
        if(!target) {
            return message.channel.send("```/kick <discord.tag>```")
        }
        if(target.id === message.author.id) {
            return message.channel.send("**Esti prost? Nu poti sa iti dai kick singur :)**")
        }
        let member = message.mentions.members.first();
        member.kick().then((member) => {
            let embed = new Discord.MessageEmbed()
            .setDescription(`${target} cu id-ul (${target.id})`)
            .setColor("RED")
            .setFooter(`A primit kick de la ${message.author.username}`);
            message.channel.send(embed)
        })
    }
})

client.on('message', message => {
    if(message.content.startsWith(`${prefix}ban`)) {
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("```Nu ai permisiunea sa folosesti aceasta comanda!```")
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("**Nu am permisiunea pentru a folosi aceasta comanda!**")
        }
        let target = message.mentions.members.first();
        if(!target) {
            return message.channel.send("```/ban <discord.tag>```")
        }
        if(target.id === message.author.id) {
            return message.channel.send("**Esti prost? Nu poti sa iti dai ban singur :)**")
        }
        let member = message.mentions.members.first();
        member.ban().then((member) => {
            let embed = new Discord.MessageEmbed()
            .setDescription(`${target} cu id-ul (${target.id})`)
            .setColor("RED")
            .setFooter(`A primit ban de la ${message.author.username}`);
            message.channel.send(embed)
        })
    }
})

client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === "id")
    welcomeChannel.send(`${member} a intrat pe server! Avatarul lui este: ${member.user.displayAvatarURL()}`)
})
client.on("guildMemberRemove", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === "id")
    welcomeChannel.send(`${member} a iesit de pe server! Avatarul lui a fost: ${member.user.displayAvatarURL()}`)
})
client.on('message', async message => {
    const swearWords = ["Muie S1lent", "Sugi pl S1lent", "O fut pe mata S1lent"]
    if(swearWords.some(word => message.content.includes(word))) {
        message.delete()
        message.channel.send(`${message.author.tag} ** nu ai voie sa-l injuri pe S1lent**!`)
    }
})


    




client.login(token)
