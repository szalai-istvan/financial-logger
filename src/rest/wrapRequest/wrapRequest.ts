import type { Request, Response } from "express";
import { ErrorCode } from "../../types/ErrorCode.js";
import type { ErrorMessage } from "../../types/Error.js";
import { validateJwtToken } from "../../jwt/jwt.js";

export async function wrapAuthenticatedRequest(req: Request, res: Response, handler: Function): Promise<void> {
    if (!req) {
        createErrorResponse(res, {
            status: 400,
            errorCode: ErrorCode.REQUEST_IS_NULL_OR_UNDEFINED,
            message: 'Request is null or undefined!'
        });
        return;
    }

    if (!validateJwtToken(req)) {
        createErrorResponse(res, {
            status: 401,
            errorCode: ErrorCode.UNAUTHORIZED,
            message: 'Invalid JWT token!'
        });
    }

    try {
        const result = await handler(req);
        res.status(200).json(result);
    } catch(e) {
        const error = (e as ErrorMessage);
        createErrorResponse(res, error);
    }
}

export function createAuthenticatedRequestWrapper(handler: Function): any {
    return async (req: Request, res: Response) => wrapAuthenticatedRequest(req, res, handler);
}

function createErrorResponse(res: Response, error: ErrorMessage) {
    res.status(error.status).json({
        errorCode: error.errorCode,
        message: error.message
    });
}