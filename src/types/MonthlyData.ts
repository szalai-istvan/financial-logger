export interface MonthlyData {
    year: number,
    month: number,
    costs: Cost[],
    incomes: Income[],
    fixCosts: FixCost[],
    goal: MonthlyGoal
}

export interface Cost {
    day: number,
    amount: number,
    category: string,
    comment: string
}

export interface Income {
    name: string,
    amount: number
}

export interface FixCost {
    name: string,
    amount: number
}

export interface MonthlyGoal {
    percentage: number,
    amount: number
}
