import { NextRequest, NextResponse } from 'next/server';
import { validateSession, hasUserPurchased } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
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
    
    const toolSlug = params.slug;
    const hasAccess = await hasUserPurchased(session.userId, toolSlug);
    
    return NextResponse.json({ hasAccess });
    
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 