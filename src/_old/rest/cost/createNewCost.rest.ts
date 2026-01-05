import type { Request } from "express";
import { CommonValidator } from "../../../validator/commonValidator.validator.js";
import type { CreateCostRequestBody, CreateCostResponseBody } from "../../../types/cost.type.js";
import { ErrorCode, type ErrorMessage } from "../../../types/errors.type.js";
import { DateHelper } from "../../../helpers/date.helper.js";
import { IdHelper } from "../../../helpers/id.helper.js";
import type { Cost } from "../../../types/monthlyData.type.js";

export function createNewCost(req: Request): CreateCostResponseBody {
    CommonValidator.validateRequestBodyExists(req);

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
    let body = CommonValidator.validateRequestBodySchemaAndGet<CreateCostRequestBody>(req);

    const year = body.year;
    const month = body.month;
    
    const currentDate = DateHelper.getCurrentDate();
    if (year !== currentDate.year || month !== currentDate.month) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Costs can only be created to current month!',
            errorCode: ErrorCode.CANNOT_CREATE_OR_EDIT_COST
        };
        throw error;
    }

    return body;
}

function saveCost(req: Request, cost: CreateCostRequestBody): CreateCostResponseBody {
    const id = IdHelper.createUniqueId();
    const costEntity: Cost = {
        _id: id,
        day: cost.day,
        amount: cost.amount,
        category: cost.category,
        comment: cost.comment
    };

    const monthlyCostId = IdHelper.getMonthlyCostId(req, cost.year, cost.month);
    //MONGO_COLLECTION_MONTHLY_DATA.updateOne({ _id: monthlyCostId }, { $push: { costs: costEntity } });
    return { id: id };
}