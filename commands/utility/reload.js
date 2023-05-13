const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads a command.")
        .addStringOption(option =>
            option.setName("command")
                .setDescription("The command to reload.")
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString("command", true).toLowerCase();
        const command  = interaction.client.commands.get(commandName);

        if(!command) return interaction.reply(`The command ${commandName} does not exist!`);

        console.log(`${command.data.description.split("--")[1]}`);
        const commandCategory = command.data.description.split("--")[1].toLowerCase();
        const filePath = `../${commandCategory}/${command.data.name}.js`;
        delete require.cache[require.resolve(filePath)];

        try {
            await interaction.client.commands.delete(command.data.name);
            const newCommand = require(filePath);
            await interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
    }
}