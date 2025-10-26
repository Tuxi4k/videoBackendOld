import type { Contact, User } from "@/database/schema"; // Drizzle типы

export type { Contact, User };

export interface FormData {
  fio: string;
  phone: string;
  address: string;
  house: string;
  agreement: string;
  email?: string;
}

export interface CreateContactData {
  fio: string;
  phone: string;
  address: string;
  house: string;
  agreement: string;
  email?: string;
  tags?: Record<string, any>;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface JwtPayload {
  username: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
