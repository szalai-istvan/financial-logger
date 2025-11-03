import type { Request, Response } from "express";

export function createJwtToken() {
    throw new Error('Not implemented!');
}

export function validateJwtToken(req: Request): boolean {
    req.headers.userName = getCurrentUser();
    return true;
}

export function getCurrentUser(): string {
    return 'szalai-istvan';
}