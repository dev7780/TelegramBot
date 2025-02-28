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

  if (text.startsWith('/')) return;

  if (text === "💎 Claim Deposit Offer 💎") {
    bot.sendPhoto(chatId, "public/pic.jpg");
    bot.sendMessage(chatId, "🚨 Bonus Drop Alert 🚨\n\nAs promised, would give you a HUGE drop! 🎁\n\nIt's officially the month of good! Here's another offer boost to show how much we love our amazing players!\nNote: both new AND existing users may claim these offers\n\n💎 300% match up to $300.000\n🚫 No Wager Requirements\n📅 Expires Feb 28st at 11:59PM UTC\n\n🚀 Users who claim and deposit $10,000 or more will receive the benefit of an exclusive VIP Host and personalized bonuses for 7 calendar days!\nIf you already have a VIP Host, you'll receive an additional 50% deposit match instead.\n\nClick Claim Deposit Offer for more details");
    
  }
  if (text === "🎟️ Raffle 🎟️") {
    bot.sendMessage(chatId, "Sorry, there is no active raffle at the moment!");
  }
  if (text === "🔎Channel Directory🔎") {
    bot.sendMessage(chatId, "Stake Telegram Channel Directory\n\n🌍 Stake.com - Play Smarter\n⏩ @StakeCasino\n\n🇺🇲 Stake.us - Play Smarter\n⏩ @StakeSocial");
  }
});

console.log("Bot is running...");
