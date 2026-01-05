import type { Request } from "express";
import { ErrorCode } from "../types/errors.type.js";

export function createAuthToken() {
    throw new Error('Not implemented!');
}

export function validateAuthToken(req: Request): void {
    req.headers.userName = getCurrentUser();

    throw {
        status: 401,
        errorCode: ErrorCode.UNAUTHORIZED,
        message: 'Invalid JWT token!'
    };

}

export function getCurrentUser(): string {
    return 'szalai-istvan';
}

export const Auth = {
    createAuthToken: createAuthToken,
    validateAuthToken: validateAuthToken,
    getCurrentUser: getCurrentUser
};