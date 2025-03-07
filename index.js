const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot's token from BotFather
const token = '8062131796:AAHQJLWQZ7VW7KVBFikc7t9iEm8LfIJ7DfM';
const bot = new TelegramBot(token, { polling: true });

function sendBonusMessage(chatId) {
    bot.sendMessage(chatId, 
        "🌟 Don’t miss this amazing bonus🌟\n\n" +
        "Your incredible feedback and loyalty mean the world to us, and we want to show our appreciation in a BIG way! 🚀\n\n" +
        "For 1 DAY ONLY, we're rolling out an unbelievable 10x Deposit Bonus! Yes, you read that right—200% on your deposit! 💸💸\n\n" +
        "💥 Max Deposit: $300\n💎 Bonus: 200%\n📅 Duration: Only 24 hours left!\n🚫 No Wager Requirements\n\n" +
        "This is your chance to supercharge your gaming experience like never before. Don't let this epic opportunity slip away! 🎰💥\n\n" +
        "Ready, Set, Deposit! 🎉✨\n\nClick @StakedepositBonuses_bot to claim your bonus now!",
        {
            reply_markup: {
                keyboard: [[{ text: "💎 Claim Deposit Offer 💎" }]],
                
                resize_keyboard: true,
                one_time_keyboard: false
            }
        }
    ).then(() => {
        setTimeout(() => {
            bot.sendMessage(chatId, "Press ⬇️⬇️⬇️⬇️\n\n@StakedepositBonuses_bot to claim the bonus ✅");
        } );

        setTimeout(() => {
            bot.sendMessage(chatId, "🔼🔼🔼🔼🔼🔼🔼");
        });
    });
}

bot.onText(/\/start/, (msg) => {
    sendBonusMessage(msg.chat.id);
});

// Handle the button press event
bot.on("message", (msg) => {
    if (msg.text === "💎 Claim Deposit Offer 💎") {
        sendBonusMessage(msg.chat.id);
    }
});

console.log("Bot is running...");
