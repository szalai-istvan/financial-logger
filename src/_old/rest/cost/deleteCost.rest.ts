import type { Request } from "express";
import { getCurrentDate } from "../../helpers/date.helper.js";
import { getMonthlyCostId } from "../../helpers/id.helper.js";
import { MONGO_COLLECTION_MONTHLY_DATA } from "../../db/connection.js";
import type { DeleteCostResponseBody } from "../../types/cost.type.js";
import { ErrorCode, type ErrorMessage } from "../../types/errors.type.js";

export async function deleteCost(req: Request): Promise<DeleteCostResponseBody> {
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const costId = req.params.costId;

    if (!month || !year || !costId) {
        const error: ErrorMessage = {
            errorCode: ErrorCode.MISSING_PARAMETER,
            message: `Missing parameter: year=${year}, month=${month}, costId=${costId}`,
            status: 400
        };
        throw error;
    }

    const currentDate = getCurrentDate();
    if (year !== currentDate.year || month !== currentDate.month) {
        const error: ErrorMessage = {
            status: 400,
            message: 'Costs can only be modified at the current month!',
            errorCode: ErrorCode.CANNOT_CREATE_OR_EDIT_COST
        };
        throw error;
    }

    const monthlyCostId = getMonthlyCostId(req, year, month);
    await MONGO_COLLECTION_MONTHLY_DATA.updateOne({
        "_id": monthlyCostId
    },
        {
            $pull: {
                costs: {
                    "_id": costId
                }
            }
        },
    );

    return {
        id: costId
    };
}