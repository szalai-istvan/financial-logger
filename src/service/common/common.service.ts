import type { AbstractDatabaseRecord } from "../../types/db/AbstractDatabaseRecord.type.js";
import { IdHelper } from "../../helpers/id.helper.js";

function prepareForInsert(entity: AbstractDatabaseRecord): void {
    entity._id = IdHelper.createUniqueId();
}

export const CommonService = {
    prepareForInsert: prepareForInsert
};