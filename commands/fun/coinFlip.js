const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Flip a coin!"),
    async execute(interaction) {
        await interaction.reply(
            Math.floor(Math.random() * 2) === 0 ? "Heads!" : "Tails!"
        )
    }
}