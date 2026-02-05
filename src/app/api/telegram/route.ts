import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone } = body;

    if (!email && !phone && !name) {
      return NextResponse.json(
        { error: 'At least one contact method is required' },
        { status: 400 }
      );
    }

    const result = await sendTelegramMessage({ email, name, phone });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
