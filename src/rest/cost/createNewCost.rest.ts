import type { Request } from "express";
import { getCurrentDate } from "../../helpers/currentDate.helper.js";
import { createUniqueId, getMonthlyCostId } from "../../helpers/id.helper.js";
import { MONGO_COLLECTION_MONTHLY_DATA } from "../../mongo/connection.js";
import type { CreateCostRequestBody, CreateCostResponseBody } from "../../types/cost.type.js";
import { ErrorCode, type ErrorMessage } from "../../types/errors.type.js";
import type { Cost } from "../../types/monthlyData.type.js";

export function createNewCost(req: Request): CreateCostResponseBody {
    if (!req.body) {
        const error: ErrorMessage = {
            message: 'req.body is missing!',
            status: 400,
            errorCode: ErrorCode.MISSING_REQUEST_BODY
        };
        throw error;
    }

    const requestBody = validateAndGetRequestBody(req);
    try {
        return saveCost(req, requestBody);
    } catch (e) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Processing error',
            errorCode: ErrorCode.PROCESSING_ERROR
        };
        throw error;
    }
}

function validateAndGetRequestBody(req: Request): CreateCostRequestBody {
    let body;
    try {
        body = req.body as CreateCostRequestBody;
        if (!body) {
            throw new Error();
        }
    } catch (e) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Requestbody scheme is invalid!',
            errorCode: ErrorCode.INVALID_REQUEST_BODY
        };
        throw error;
    }

    const year = body.year;
    const month = body.month;
    
    const currentDate = getCurrentDate();
    if (year !== currentDate.year || month !== currentDate.month) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Costs can only be created to current month!',
            errorCode: ErrorCode.CANNOT_CREATE_COST
        };
        throw error;
    }

    return body;
}

function saveCost(req: Request, cost: CreateCostRequestBody): CreateCostResponseBody {
    const id = createUniqueId();
    const costEntity: Cost = {
        _id: id,
        day: cost.day,
        amount: cost.amount,
        category: cost.category,
        comment: cost.comment
    };

    const monthlyCostId = getMonthlyCostId(req, cost.year, cost.month);
    MONGO_COLLECTION_MONTHLY_DATA.updateOne({ _id: monthlyCostId }, { $push: { costs: costEntity } });
    return { id: id };
}