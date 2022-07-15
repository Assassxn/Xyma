const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                client.commands.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());

    readdirSync("./events/").forEach((file) => {
        const events = readdirSync("./events/").filter((file) =>
          file.endsWith(".js")
        );
    
        for (let file of events) {
          let pull = require(`../events/${file}`);
    
          if (pull.name) {
            client.events.set(pull.name, pull);
          } else {
            continue;
          }
        }
      });
}

// this needs to be upgraded yep you're right il do it



// this is discord V12.0, now Im moving to v13.0 and Im trying to upgrade everything as I go along