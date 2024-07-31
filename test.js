const axios = require("axios");

const token = "670739890:WzvRKSIFCOuJUbXtv8kKHwCMORVhlZTsynjHT8xU"; // جایگزین کنید با توکن بات خود
const chat_id = "288504037"; // آیدی چت یا یوزرنیم کانال/گروه
const text = "سلام به ربات خوش آمدین"; // متن پیام

const url = `https://tapi.bale.ai/bot${token}/sendMessage`;

const params = {
  chat_id: chat_id,
  text: text,
};

const sendMessage = async (retries = 3) => {
  try {
    const response = await axios.post(url, params, { timeout: 20000 });
    console.log("پیام با موفقیت ارسال شد:", response.data);
  } catch (error) {
    if (retries > 0) {
      console.log(
        `تلاش مجدد برای ارسال پیام... تعداد تلاش‌های باقی‌مانده: ${retries}`
      );
      await new Promise((res) => setTimeout(res, 2000)); // 2 ثانیه صبر
      sendMessage(retries - 1);
    } else {
      console.error("خطا در ارسال پیام:", error);
    }
  }
};

sendMessage();
