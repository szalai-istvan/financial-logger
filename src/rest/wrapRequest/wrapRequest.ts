import type { Request, Response } from "express";
import { ErrorCode } from "../../types/ErrorCode.js";
import type { Error } from "../../types/Error.js";

export function wrapRequest(req: Request, res: Response, handler: Function): void {
    if (!req) {
        createErrorResponse(res, {
            status: 400,
            errorCode: ErrorCode.REQUEST_IS_NULL_OR_UNDEFINED,
            message: 'Request is null or undefined!'
        });
        return;
    }

    try {
        const result = handler(req);
        res.status(200).json(result);
    } catch(e) {
        const error = (e as Error);
        createErrorResponse(res, error);
    }
}

export function createRequestWrapper(handler: Function): any {
    return (req: Request, res: Response) => wrapRequest(req, res, handler);
}

function createErrorResponse(res: Response, error: Error) {
    res.status(error.status).json({
        errorCode: error.errorCode,
        message: error.message
    });
}