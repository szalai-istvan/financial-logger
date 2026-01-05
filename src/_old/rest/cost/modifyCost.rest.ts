import type { Request } from "express";
import type { ModifyCostRequestBody, ModifyCostResponseBody } from "../../../types/cost.type.js";
import { CommonValidator } from "../../../validator/commonValidator.validator.js";
import { ErrorCode, type ErrorMessage } from "../../../types/errors.type.js";
import { DateHelper } from "../../../helpers/date.helper.js";
import { IdHelper } from "../../../helpers/id.helper.js";

export function modifyCost(req: Request): ModifyCostResponseBody | null {
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

function validateAndGetRequestBody(req: Request): ModifyCostRequestBody {
    const body = CommonValidator.validateRequestBodySchemaAndGet<ModifyCostRequestBody>(req);

    const year = body.year;
    const month = body.month;

    const currentDate = DateHelper.getCurrentDate();
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

function saveCost(req: Request, requestBody: ModifyCostRequestBody): ModifyCostResponseBody | null {
    const id = requestBody.id;
    const monthlyCostId = IdHelper.getMonthlyCostId(req, requestBody.year, requestBody.month);
    /*
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

    return { id: id };*/
    return null;
}
