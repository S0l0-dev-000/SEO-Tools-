import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, name, source = 'homepage', leadMagnet } = await request.json();
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingSubscriber = await db.newsletter.findUnique({
      where: { email },
    });
    
    if (existingSubscriber) {
      // Update existing subscriber's information
      const updatedSubscriber = await db.newsletter.update({
        where: { email },
        data: {
          name: name || existingSubscriber.name,
          source,
          leadMagnet,
          isActive: true,
          updatedAt: new Date(),
        },
      });
      
      return NextResponse.json({
        message: 'Successfully updated subscription',
        subscriber: {
          id: updatedSubscriber.id,
          email: updatedSubscriber.email,
          name: updatedSubscriber.name,
        },
      });
    }
    
    // Create new subscriber
    const subscriber = await db.newsletter.create({
      data: {
        email,
        name,
        source,
        leadMagnet,
        isActive: true,
      },
    });
    
    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
      },
    });
    
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 