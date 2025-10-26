import type { ErrorCode } from "./ErrorCode.js";

export interface Error {
    status: number,
    errorCode: ErrorCode,
    message: string
}

export interface ErrorResponse {
    errorCode: ErrorCode,
    message: string
}