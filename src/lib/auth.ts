import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface JWTPayload {
  userId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken({ userId, email: '' });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await db.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
  
  return token;
}

export async function validateSession(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const session = await db.session.findUnique({
      where: { token },
      include: { user: true },
    });
    
    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session
      if (session) {
        await db.session.delete({ where: { id: session.id } });
      }
      return null;
    }
    
    return {
      userId: session.user.id,
      email: session.user.email,
    };
  } catch {
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  await db.session.deleteMany({ where: { token } });
}

export async function getUserPurchases(userId: string) {
  return await db.purchase.findMany({
    where: { userId, status: 'completed' },
    include: { tool: true },
  });
}

export async function hasUserPurchased(userId: string, toolSlug: string): Promise<boolean> {
  const purchase = await db.purchase.findFirst({
    where: {
      userId,
      status: 'completed',
      tool: { slug: toolSlug },
    },
  });
  
  return !!purchase;
} 