'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
})

export type FormState = {
  success?: boolean
  error?: string
  message?: string
}

export async function submitWaitlist(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input fields',
      message: validatedFields.error.issues[0].message
    }
  }

  const { name, phone, email } = validatedFields.data



  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_IDS = process.env.CHAT_IDS

  if (!BOT_TOKEN || !CHAT_IDS) {
    console.error('Telegram credentials missing')
    // In production, you might want to log this but still return a generic error or success to the user
    // For now, we'll return an error to help with debugging
    return {
      success: false,
      error: 'Configuration Error',
      message: 'System is not configured correctly (Missing Telegram Credentials)',
    }
  }

  const message = `
🏛️ *New Lexshadi Waitlist Join* 🏛️

👤 *Name*: ${name}
📱 *Phone*: ${phone}
📧 *Email*: ${email}

_Source: Landing Page_
`

  try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    const ids = CHAT_IDS.split(',').map((id) => id.trim())

    const promises = ids.map((chat_id) => 
      fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          text: message,
          parse_mode: 'Markdown',
        }),
      })
    )

    const results = await Promise.all(promises)
    const allSuccessful = results.every(r => r.ok)

    if (!allSuccessful) {
        console.error("Some telegram messages failed to send")
        throw new Error('Failed to send telegram message')
    }

    return {
      success: true,
      message: 'You have been added to the exclusive list.',
    }
  } catch (error) {
    console.error('Submission error:', error)
    return {
      success: false,
      error: 'Submission Failed',
      message: String(error),
    }
  }
}
