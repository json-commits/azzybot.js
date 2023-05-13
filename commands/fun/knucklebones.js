const {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ComponentType} = require('discord.js');

function roll() {
    return Math.floor(Math.random() * 6) + 1;
}

function game(gameData) {

    gameData.move
}

const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("button_1")
            .setLabel("1")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("button_2")
            .setLabel("2")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("button_3")
            .setLabel("3")
            .setStyle(ButtonStyle.Primary),
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("knucklebones")
        .setDescription("Play a game of knucklebones!"),
    async execute(interaction) {
        await interaction.reply({content: `You rolled: ${roll()}`, components: [row]})
            .then(() => {
                const filter = i => i.customId.startsWith("button_") && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000});

                collector.on('collect', async i => {
                    console.log(i.content)
                    // const roll = i.content.slice(-1);
                    if (i.customId === "button_1") {
                        await i.update({content: "You chose 1!", components: [row]});
                    } else if (i.customId === "button_2") {
                        await i.update({content: "You chose 2!", components: [row]});
                    } else if (i.customId === "button_3") {
                        await i.update({content: "You chose 3!", components: [row]});
                    }
                });

                collector.on('end', collected => {
                    interaction.editReply({content: `Interaction ended.`, components: []});
                });
            });
    }
}