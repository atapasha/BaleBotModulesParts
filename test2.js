const axios = require("axios");

class TelegramBot {
  constructor(token, chat_id) {
 
   }

  async sendMessage(text, retries = 3) {
    const params = {
      chat_id: this.chat_id,
      text: text,
    };

    try {
      const response = await axios.post(this.url, params, { timeout: 20000 });
      console.log("پیام با موفقیت ارسال شد:", response.data);
    } catch (error) {
      if (retries > 0) {
        console.log(
          `تلاش مجدد برای ارسال پیام... تعداد تلاش‌های باقی‌مانده: ${retries}`
        );
        await new Promise((res) => setTimeout(res, 2000)); // 2 ثانیه صبر
        await this.sendMessage(text, retries - 1); // استفاده از await
      } else {
        console.error("خطا در ارسال پیام:", error);
      }
    }
  }
}

// استفاده از کلاس
const token = process.env.TELEGRAM_BOT_TOKEN; // توکن ربات

const chat_id = "288504037"; // آیدی چت یا یوزرنیم کانال/گروه

const bot = new TelegramBot(token, chat_id);

const messageText = "سلام به ربات خوش آمدیننننننننننننننننننننننننننننن"; // متن پیام

// ارسال پیام
bot.sendMessage(messageText);
