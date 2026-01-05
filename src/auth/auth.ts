import type { Request } from "express";

export function createAuthToken() {
    throw new Error('Not implemented!');
}

export function validateAuthToken(req: Request): boolean {
    req.headers.userName = getCurrentUser();
    return true;
}

export function getCurrentUser(): string {
    return 'szalai-istvan';
}

export const Auth = {
    createAuthToken: createAuthToken,
    validateAuthToken: validateAuthToken,
    getCurrentUser: getCurrentUser
};