import type { Request, Response } from "express";
import { ErrorCode, type ErrorMessage } from "../../../types/errors.type.js";
import { Auth } from "../../../auth/auth.js";


function createAuthenticatedRequestWrapper(handler: Function): any {
    return async (req: Request, res: Response) => wrapRequest(req, res, handler, true);
}

function createRequestWrapper(handler: Function): any {
    return async (req: Request, res: Response) => wrapRequest(req, res, handler, false);
}

async function wrapRequest(req: Request, res: Response, handler: Function, auth: boolean): Promise<void> {
    try {
        checkRequestExists(req);

        if (auth) {
            Auth.validateAuthToken(req);
        }

        const result = await handler(req);
        res.status(200).json(result);
    } catch(e) {
        createErrorResponse(res, e);
    }
}

function checkRequestExists(req: Request): void {
    if (!req) {
        throw {
            status: 400,
            errorCode: ErrorCode.REQUEST_IS_NULL_OR_UNDEFINED,
            message: 'Request is null or undefined!'
        };
    }
}

function createErrorResponse(res: Response, e: any) {
    try {
        const error = (e as ErrorMessage);
        res.status(error.status).json({
            errorCode: error.errorCode,
            message: error.message
        });
    } catch (castingError) {
        res.status(500).json({
            errorCode: ErrorCode.UNEXPECTED_ERROR,
            message: 'Unexpected error!'
        });
    }
}

export const RequestWrapper = {
    createAuthenticatedRequestWrapper: createAuthenticatedRequestWrapper,
    createRequestWrapper: createRequestWrapper
};