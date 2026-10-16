import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
  AuthResponse,
  JwtPayload,
  UserDto,
} from '../types/auth.types';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(userDto: UserDto, res: Response): Promise<AuthResponse> {
    const username = userDto?.username;
    const password = userDto?.password;

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);
    this.sendTokenInCookie(res, token);

    return {
      success: true,
      message: 'Logged in successfully',
      token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async refresh(req: Request, res: Response): Promise<AuthResponse> {
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const newPayload: JwtPayload = {
      sub: payload.sub,
      username: payload.username,
    };

    const newToken = await this.jwtService.signAsync(newPayload);
    this.sendTokenInCookie(res, newToken);

    return {
      success: true,
      message: 'Token refreshed successfully',
      token: newToken,
      user: {
        id: payload.sub,
        username: payload.username,
      },
    };
  }

  logout(res: Response): { success: boolean; message: string } {
    res.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  private sendTokenInCookie(res: Response, token: string): void {
    res.cookie(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
  }

  private extractToken(req: Request): string | undefined {
    return (
      req.cookies?.[AUTH_COOKIE_NAME] ||
      req.cookies?.['jwt'] ||
      req.cookies?.['access_token'] ||
      req.cookies?.['token'] ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.substring(7)
        : undefined) ||
      req.body?.token ||
      req.body?.refreshToken
    );
  }
  private async validateUser(username?: string, password?: string): Promise<{ id: string; username: string } | null> {
    // todo
    return null;
  }
}
