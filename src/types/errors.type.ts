export interface ErrorMessage {
    status: number,
    errorCode: ErrorCode,
    message: string
}

export interface ErrorResponse {
    errorCode: ErrorCode,
    message: string
}

export enum ErrorCode {
    REQUEST_IS_NULL_OR_UNDEFINED = 'REQUEST_IS_NULL_OR_UNDEFINED',
    MISSING_PARAMETER = 'MISSING_PARAMETER',
    MISSING_REQUEST_BODY = 'MISSING_REQUEST_BODY',
    UNAUTHORIZED = 'UNAUTHORIZED',
    PROCESSING_ERROR = 'PROCESSING_ERROR',
    INVALID_REQUEST_BODY = 'INVALID_REQUEST_BODY',
    CANNOT_CREATE_OR_EDIT_COST = 'CANNOT_CREATE_COST',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
    DUPLICATE_USERNAME = 'DUPLICATE_USERNAME'
}