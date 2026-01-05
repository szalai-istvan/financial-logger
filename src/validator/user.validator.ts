import { Constants } from "../constants/constants.js";
import { UserService } from "../service/user.service.js";
import { ErrorCode, type ErrorMessage } from "../types/errors.type.js";
import type { CreateUserRequest } from "../types/rest/CreateUserRequest.type.js";

async function validateCreateUserRequest(user: CreateUserRequest): Promise<void> {
    const existingUser = await UserService.findByUserName(user.userName);
    // TODO email should also be unique

    if (existingUser) {
        const error: ErrorMessage = {
            status: 400,
            errorCode: ErrorCode.DUPLICATE_USERNAME,
            message: 'Not unique username!'
        };
        throw error;
    }

    const userNameIsValid = Constants.userNameRegex.test(user.userName);
    if (!userNameIsValid) {
        const error: ErrorMessage = {
            status: 400,
            errorCode: ErrorCode.INVALID_USERNAME,
            message: 'Username is invalid!'
        };
        throw error;
    }

    const passwordIsValid = Constants.passwordRegex.test(user.password);
    if (!passwordIsValid) {
        const error: ErrorMessage = {
            status: 400,
            errorCode: ErrorCode.INVALID_PASSWORD,
            message: 'Password is invalid!'
        };
        throw error;
    }

    const emailIsValid = Constants.emailRegex.test(user.email);
    if (!emailIsValid) {
        const error: ErrorMessage = {
            status: 400,
            errorCode: ErrorCode.EMAIL_INVALID,
            message: 'Email address is invalid!'
        };
        throw error;
    }
}

export const UserValidator = {
    validateCreateUserRequest: validateCreateUserRequest
};