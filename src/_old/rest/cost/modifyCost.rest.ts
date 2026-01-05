import type { Request } from "express";
import { getCurrentDate } from "../../helpers/date.helper.js";
import { validateRequestBodyExists, validateRequestBodySchemaAndGet } from "../../validator/validator.helper.js";
import type { ModifyCostRequestBody, ModifyCostResponseBody } from "../../types/cost.type.js";
import { ErrorCode, type ErrorMessage } from "../../types/errors.type.js";
import { MONGO_COLLECTION_MONTHLY_DATA } from "../../db/connection.js";
import { getMonthlyCostId } from "../../helpers/id.helper.js";

export function modifyCost(req: Request): ModifyCostResponseBody {
    validateRequestBodyExists(req);

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

function validateAndGetRequestBody(req: Request): ModifyCostRequestBody {
    const body = validateRequestBodySchemaAndGet<ModifyCostRequestBody>(req);

    const year = body.year;
    const month = body.month;

    const currentDate = getCurrentDate();
    if (year !== currentDate.year || month !== currentDate.month) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Costs can only be modified at the current month!',
            errorCode: ErrorCode.CANNOT_CREATE_OR_EDIT_COST
        };
        throw error;
    }

    return body;
}

function saveCost(req: Request, requestBody: ModifyCostRequestBody): ModifyCostResponseBody {
    const id = requestBody.id;
    const monthlyCostId = getMonthlyCostId(req, requestBody.year, requestBody.month);
    MONGO_COLLECTION_MONTHLY_DATA.updateOne(
        {
            _id: monthlyCostId,
            "costs._id": id
        },
        {
            $set: {
                "items.$.day": requestBody.day,
                "items.$.amount": requestBody.amount,
                "items.$.category": requestBody.category,
                "items.$.comment": requestBody.comment
            }
        }
    );

    return { id: id };
}
