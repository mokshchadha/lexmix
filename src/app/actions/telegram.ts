"use server";

export async function sendMessageToTelegram(message: string) {
  const botKey = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = process.env.CHAT_IDS;

  if (!botKey || !chatIds) {
    console.error("Missing TELEGRAM_BOT_KEY or CHAT_IDS in environment variables");
    return { success: false, error: "Configuration error" };
  }

  const ids = chatIds.split(",").map((id) => id.trim());
  const url = `https://api.telegram.org/bot${botKey}/sendMessage`;

  try {
    const promises = ids.map((chat_id) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id,
          text: message,
          parse_mode: "HTML",
        }),
      })
    );

    const results = await Promise.all(promises);
    
    // Check if all requests were successful
    const allSuccessful = results.every(r => r.ok);
    
    if (!allSuccessful) {
        console.error("Some telegram messages failed to send");
        return { success: false, error: "Partial failure" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending telegram message:", error);
    return { success: false, error: "Failed to send message" };
  }
}
