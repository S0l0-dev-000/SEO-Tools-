import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { toolSlug } = await request.json();
    
    // Validate authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }
    
    // Get tool information
    const tool = await db.tool.findUnique({
      where: { slug: toolSlug },
    });
    
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    // Check if user already purchased this tool
    const existingPurchase = await db.purchase.findFirst({
      where: {
        userId: session.userId,
        toolId: tool.id,
        status: 'completed',
      },
    });
    
    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You have already purchased this tool' },
        { status: 400 }
      );
    }
    
    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession({
      toolId: tool.id,
      toolName: tool.name,
      toolPrice: tool.price,
      userId: session.userId,
      successUrl: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
    });
    
    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 