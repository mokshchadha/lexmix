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

  try {
    const { sendTelegramMessage } = await import('@/lib/telegram')
    
    // Call shared logic directly without network hop
    const result = await sendTelegramMessage({
      name,
      email,
      phone
    })

    if (!result.success) {
        console.error(`Telegram API failed: ${result.error}`);
        throw new Error(result.error || 'Failed to send message');
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
      message: 'Failed to join waitlist. Please try again.',
    }
  }
}
