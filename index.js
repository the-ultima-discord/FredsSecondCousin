const Discord = require('discord.js');
const Client = new Discord.Client();
const {Prefix, Token} = require('./config.json');
const fs = require('fs');


Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(x => x.endsWith(`.js`));

// if i ever wanna add commands then pogChamp.
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}

const responses = [
    "I know we all have opinions, but this is blasphemy.",
    "A for effort.",
    "I gouged my eyes out reading this.",
    "Seems you just want a ban now don't you.",
    "I'm done.",
    "Pro Tip: Next time don't type with your eyes closed.",
    "Even though your entitled to your opinion, just know that no one agrees with that statement.",
    "I didn't know troglodites could spell."
]


Client.on('ready', async() => {
    console.log("Shit bot online!");
});

Client.on('message', async(message) => {
    const args = message.content.slice(Prefix.length).trim().split(/ +/);

    if(message.author.bot) return;
    if(!message.guild) return;

    if(message.content.startsWith("ultima rate my", 0)){
        if(message.content === "ultima rate my") return;
        const randomIndex = Math.floor(Math.random() * (responses.length -1) + 1);
        const response = responses[randomIndex];
        message.channel.send(response);
    }
// If i ever want commands then i can add them easily pogChamp
    const command = args.shift().toLowerCase();

    if(!Client.commands.has(command)) return;

    try{
        Client.commands.get(command).execute(Client, message, args);
    }catch(error){
        console.log(error);
    }
});

Client.login(Token);