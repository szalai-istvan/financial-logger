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