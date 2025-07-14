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
    console.log(`🔔 Webhook received: ${event.type}`);
    
    switch (event.type) {
      // One-time payment completed
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      // Payment succeeded (backup confirmation)
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      // Payment failed
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      // Refund processed
      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;
      
      // Chargeback/dispute created
      case 'charge.dispute.created':
        await handleDispute(event.data.object);
        break;
      
      // Subscription created (future feature)
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      
      // Subscription updated (plan changes)
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      // Subscription canceled
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      // Recurring payment succeeded
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      
      // Recurring payment failed
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`📝 Unhandled webhook event: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle successful checkout completion
async function handleCheckoutCompleted(session: any) {
  const toolId = session.metadata?.toolId;
  const userId = session.metadata?.userId;
  
  if (!toolId || !userId) {
    console.error('❌ Missing metadata in checkout session');
    return;
  }
  
  try {
    // Create purchase record
    await db.purchase.create({
      data: {
        userId,
        toolId,
        stripePaymentId: session.payment_intent as string,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        status: 'completed',
      },
    });
    
    console.log(`✅ Purchase created for user ${userId} and tool ${toolId}`);
  } catch (error) {
    console.error('❌ Error creating purchase:', error);
  }
}

// Handle payment success confirmation
async function handlePaymentSucceeded(paymentIntent: any) {
  try {
    // Update purchase status if needed
    await db.purchase.updateMany({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: 'completed' }
    });
    
    console.log(`✅ Payment confirmed: ${paymentIntent.id}`);
  } catch (error) {
    console.error('❌ Error confirming payment:', error);
  }
}

// Handle payment failure
async function handlePaymentFailed(paymentIntent: any) {
  try {
    // Update purchase status to failed
    await db.purchase.updateMany({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: 'failed' }
    });
    
    console.log(`❌ Payment failed: ${paymentIntent.id}`);
    // TODO: Send email notification to customer about failed payment
  } catch (error) {
    console.error('❌ Error handling payment failure:', error);
  }
}

// Handle refunds
async function handleRefund(charge: any) {
  try {
    // Update purchase status to refunded
    await db.purchase.updateMany({
      where: { stripePaymentId: charge.payment_intent },
      data: { status: 'refunded' }
    });
    
    console.log(`💰 Refund processed: ${charge.id}`);
    // TODO: Revoke tool access, send confirmation email
  } catch (error) {
    console.error('❌ Error handling refund:', error);
  }
}

// Handle disputes/chargebacks
async function handleDispute(dispute: any) {
  try {
    console.log(`⚠️  Dispute created: ${dispute.id} for charge: ${dispute.charge}`);
    // TODO: Alert admin, gather evidence, update purchase status
  } catch (error) {
    console.error('❌ Error handling dispute:', error);
  }
}

// Future: Handle subscription creation
async function handleSubscriptionCreated(subscription: any) {
  try {
    console.log(`🔄 Subscription created: ${subscription.id}`);
    // TODO: Create subscription record, grant premium access
  } catch (error) {
    console.error('❌ Error handling subscription creation:', error);
  }
}

// Future: Handle subscription updates
async function handleSubscriptionUpdated(subscription: any) {
  try {
    console.log(`🔄 Subscription updated: ${subscription.id}`);
    // TODO: Update subscription record, adjust access levels
  } catch (error) {
    console.error('❌ Error handling subscription update:', error);
  }
}

// Future: Handle subscription cancellation
async function handleSubscriptionDeleted(subscription: any) {
  try {
    console.log(`🔄 Subscription canceled: ${subscription.id}`);
    // TODO: Update subscription record, revoke access
  } catch (error) {
    console.error('❌ Error handling subscription cancellation:', error);
  }
}

// Future: Handle recurring payment success
async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    console.log(`💰 Invoice paid: ${invoice.id}`);
    // TODO: Extend subscription period, send receipt
  } catch (error) {
    console.error('❌ Error handling invoice payment:', error);
  }
}

// Future: Handle recurring payment failure
async function handleInvoicePaymentFailed(invoice: any) {
  try {
    console.log(`❌ Invoice payment failed: ${invoice.id}`);
    // TODO: Send dunning emails, suspend access after grace period
  } catch (error) {
    console.error('❌ Error handling invoice payment failure:', error);
  }
} 