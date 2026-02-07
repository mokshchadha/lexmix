import dns from 'node:dns';

// Force IPV4 to avoid timeouts with some providers preferring IPv6
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

interface TelegramMessageParams {
  email?: string;
  name?: string;
  phone?: string;
}

export async function sendTelegramMessage({ email, name, phone }: TelegramMessageParams): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Adapt to use CHAT_IDS as per user's .env, falling back to TELEGRAM_CHAT_ID if they change it later
  const chatId = process.env.CHAT_IDS || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram credentials missing:', { 
      hasToken: !!token, 
      hasChatId: !!chatId 
    });
    return { success: false, error: 'Server configuration error' };
  }

  const message = `
⚖️ *waitlist update*

📧 *Email:* ${email || 'Not provided'}
👤 *Name:* ${name || 'Not provided'}
📱 *Phone:* ${phone || 'Not provided'}
  `;

  const chatIds = chatId.split(',').map(id => id.trim()).filter(Boolean);
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const sendPromises = chatIds.map(async (id) => {
    try {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: id,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         console.error(`Telegram API Error for chat ${id}:`, errorData);
         return false;
      }
      return true;
    } catch (err) {
      console.error(`Failed to send to chat ${id}:`, err);
      return false;
    }
  });

  const results = await Promise.all(sendPromises);
  const allSuccess = results.every(Boolean);

  if (!allSuccess) {
      return { success: false, error: 'Failed to send to some recipients' };
  }

  return { success: true };
}
