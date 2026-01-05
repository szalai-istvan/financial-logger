import type { Request } from "express";
import { ErrorCode, type ErrorMessage } from "../types/errors.type.js";

export function validateRequestBodyExists(req: Request) {
    if (!req.body) {
        const error: ErrorMessage = {
            message: 'req.body is missing!',
            status: 400,
            errorCode: ErrorCode.MISSING_REQUEST_BODY
        };
        throw error;
    }
}

export function validateRequestBodySchemaAndGet<T>(req: Request): T {
    let body: T;
    try {
        body = req.body as T;
        if (!body) {
            const error: ErrorMessage = {
                message: 'requestbody schema is invalid!',
                status: 400,
                errorCode: ErrorCode.INVALID_REQUEST_BODY
            };
            throw error;
        }
    } catch (e) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Requestbody schema is invalid!',
            errorCode: ErrorCode.INVALID_REQUEST_BODY
        };
        throw error;
    }

    return body;
}