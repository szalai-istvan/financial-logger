import type { CookieOptions } from 'express';

export const AUTH_COOKIE_NAME = 'jwt';

export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

export interface UserDto {
  username: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    username: string;
    id?: string;
  };
}
