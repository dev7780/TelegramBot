const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot's token from BotFather
const token = '7924314310:AAFTZs7PTtXGXD3Ww0RVBX3UjEsBD7OdhYA';
const bot = new TelegramBot(token, { polling: true });

// Respond to /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send subscription confirmation messages
  bot.sendMessage(chatId, "Congratulations! You subscribed to Stake Bot.\n\nUse /off to pause your subscription.");
  bot.sendMessage(chatId, "Want to create your own bot?\nGo to @Manybot",{
    reply_markup: {
      keyboard: [
        ["💎 Claim Deposit Offer 💎"],
        ["🎟️ Raffle 🎟️"],
        ["🔎Channel Directory🔎"]
      ],
      resize_keyboard: true,
      input_field_placeholder: "Write a message..."
    }
  });
});

// Handle button presses
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "💎 Claim Deposit Offer 💎") {
    bot.sendMessage(chatId, "🎉 Offer Claimed! Our team will contact you shortly.");
  }
  if (text === "🎟️ Raffle 🎟️") {
    bot.sendMessage(chatId, "Sorry, there is no active raffle at the moment!");
  }
  if (text === "🔎Channel Directory🔎") {
    bot.sendMessage(chatId, "Stake Telegram Channel Directory\n\n🌍 Stake.com - Play Smarter\n⏩ @StakeCasino\n\n🇺🇲 Stake.us - Play Smarter\n⏩ @StakeSocial");
  }
});

console.log("Bot is running...");
