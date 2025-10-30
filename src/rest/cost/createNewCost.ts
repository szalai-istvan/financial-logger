import type { Request } from "express";
import type { CreateCostRequestBody, CreateCostResponseBody } from "../../types/cost.js";
import type { ErrorMessage } from "../../types/Error.js";
import { ErrorCode } from "../../types/ErrorCode.js";

export function createNewCost(req: Request): CreateCostResponseBody {
    if (!req.body) {
        const error: ErrorMessage = {
            message: 'Requestbody missing!',
            status: 400,
            errorCode: ErrorCode.MISSING_REQUEST_BODY
        };
        throw error;
    }

    const requestBody = req.body as CreateCostRequestBody;
    try {
        return saveCost(requestBody);
    } catch (e) {
        const error: ErrorMessage = e as ErrorMessage;
        throw error;
    }
}

function saveCost(cost: CreateCostRequestBody): CreateCostResponseBody {
    return {id: ''}; // TODO mongo
}