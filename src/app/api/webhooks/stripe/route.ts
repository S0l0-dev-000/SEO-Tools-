import { NextRequest, NextResponse } from 'next/server';
import { constructEvent } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }
    
    const event = constructEvent(body, signature);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Extract metadata
      const toolId = session.metadata?.toolId;
      const userId = session.metadata?.userId;
      
      if (!toolId || !userId) {
        console.error('Missing metadata in checkout session');
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        );
      }
      
      // Create purchase record
      await db.purchase.create({
        data: {
          userId,
          toolId,
          stripePaymentId: session.payment_intent as string,
          amount: (session.amount_total || 0) / 100, // Convert from cents
          currency: session.currency || 'usd',
          status: 'completed',
        },
      });
      
      console.log(`Purchase created for user ${userId} and tool ${toolId}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 