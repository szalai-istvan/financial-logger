import type { Request } from "express";
import { IdHelper } from "../helpers/id.helper.js";
import { UserService } from "../service/user.service.js";
import type { User } from "../types/db/user.type.js";
import type { CreateUserRequest } from "../types/rest/CreateUserRequest.type.js";
import type { CreateUserResponse } from "../types/rest/CreateUserResponse.type.js";
import { CommonValidator } from "../validator/commonValidator.helper.js";

async function createUser(req: Request): Promise<CreateUserResponse> {
    CommonValidator.validateRequestBodyExists(req);

    const requestBody = validateAndGetRequestBody(req);
    const user = createUserEntity(requestBody);
    const resultId = await UserService.save(user);

    return {
        id: resultId,
        userName: user.userName
    };
}

function validateAndGetRequestBody(req: Request): CreateUserRequest {
    const body = CommonValidator.validateRequestBodySchemaAndGet<CreateUserRequest>(req);

    // run validations:
    //      1. userName uniqueness
    //      2. userName and password requirements
    //      3. email format

    return body;
}

function createUserEntity(requestBody: CreateUserRequest): User {
    return {
        _id: IdHelper.createUniqueId(),
        userName: requestBody.userName,
        email: requestBody.email,
        password: requestBody.password,
        lastLogin: undefined
    };
}

export const CreateUserAction = {
    createUser: createUser
};