export interface CreateCostRequestBody {
    year: number,
    month: number,
    day: number,
    amount: number,
    category: string,
    comment: string | undefined
}

export interface CreateCostResponseBody {
    id: string
}

export interface ModifyCostRequestBody extends CreateCostRequestBody {
    id: string
}

export interface ModifyCostResponseBody {
    id: string
}

export interface DeleteCostResponseBody {
    id: string
}