import { UserService } from "../service/user.service.js";
import { ErrorCode, type ErrorMessage } from "../types/errors.type.js";
import type { CreateUserRequest } from "../types/rest/CreateUserRequest.type.js";

async function validateCreateUserRequest(user: CreateUserRequest): Promise<void> {
    const existingUser = await UserService.findByUserName(user.userName);

    if (existingUser) {
        const error: ErrorMessage = {
            status: 400,
            errorCode: ErrorCode.DUPLICATE_USERNAME,
            message: 'Not unique username!'
        };
        throw error;
    }

    // run validations:
    //      1. userName and password requirements
    //      2. email format

}

export const UserValidator = {
    validateCreateUserRequest: validateCreateUserRequest
};