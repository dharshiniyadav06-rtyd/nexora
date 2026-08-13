import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// 32-character key for AES-256-CBC
const ENCRYPTION_KEY = process.env.SESSION_SECRET || 'nexora_secure_session_secret_key_';

export function encryptSession(data: any): string {
  const iv = crypto.randomBytes(16);
  // Ensure encryption key is exactly 32 bytes
  const key = Buffer.alloc(32);
  key.write(ENCRYPTION_KEY, 'utf-8');
  
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptSession(text: string): any | null {
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    
    // Ensure decryption key is exactly 32 bytes
    const key = Buffer.alloc(32);
    key.write(ENCRYPTION_KEY, 'utf-8');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Failed to decrypt session:', error);
    return null;
  }
}

export async function setSession(user: { id: string; name: string; email: string; role: string }) {
  const expires = new Date(Date.now() + SESSION_EXPIRY_MS);
  const sessionData = {
    ...user,
    expiresAt: expires.getTime()
  };
  const encrypted = encryptSession(sessionData);
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expires,
    path: '/'
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie) return null;
  
  const session = decryptSession(cookie.value);
  if (!session) return null;
  
  // Check expiry
  if (Date.now() > session.expiresAt) {
    await clearSession();
    return null;
  }
  
  return session;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
