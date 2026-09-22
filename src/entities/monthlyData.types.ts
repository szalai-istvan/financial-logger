export interface MonthlyData {
    costs: Cost[],
    target: Target,
    fixCosts: Prerequisite[],
    incomes: Prerequisite[]
}

export interface Cost {
    day: number,
    amount: number,
    category: string,
    comment: string
}

export interface Target {
    scheme: TargetSchemeEnum,
    targetAmount: number
}

export enum TargetSchemeEnum {
    PLUS_50,
    PLUS_10,
    PLAN,
    MINUS_10,
    MINUS_50,
    ZERO
}

export interface Prerequisite {
    amount: number,
    name: string
}