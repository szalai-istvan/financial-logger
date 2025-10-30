import type { ErrorCode } from "./ErrorCode.js";

export interface ErrorMessage {
    status: number,
    errorCode: ErrorCode,
    message: string
}

export interface ErrorResponse {
    errorCode: ErrorCode,
    message: string
}