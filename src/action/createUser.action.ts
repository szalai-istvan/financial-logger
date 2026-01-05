import type { Request } from "express";
import { IdHelper } from "../helpers/id.helper.js";
import { UserService } from "../service/user.service.js";
import type { User } from "../types/db/user.type.js";
import type { CreateUserRequest } from "../types/rest/CreateUserRequest.type.js";
import type { CreateUserResponse } from "../types/rest/CreateUserResponse.type.js";
import { CommonValidator } from "../validator/commonValidator.validator.js";
import { UserValidator } from "../validator/user.validator.js";
import * as argon2 from "argon2";

async function createUser(req: Request): Promise<CreateUserResponse> {
    CommonValidator.validateRequestBodyExists(req);

    const requestBody = await validateAndGetRequestBody(req);
    const user = await createUserEntity(requestBody);
    const resultId = await UserService.save(user);

    return {
        id: resultId,
        userName: user.userName
    };
}

async function validateAndGetRequestBody(req: Request): Promise<CreateUserRequest> {
    const body = CommonValidator.validateRequestBodySchemaAndGet<CreateUserRequest>(req);
    await UserValidator.validateCreateUserRequest(body);
    return body;
}

async function createUserEntity(requestBody: CreateUserRequest): Promise<User> {
    return {
        _id: IdHelper.createUniqueId(),
        userName: requestBody.userName,
        email: requestBody.email,
        password: await argon2.hash(requestBody.password),
        lastLogin: undefined
    };
}

export const CreateUserAction = {
    createUser: createUser
};