import type { Request } from "express";

export function createUniqueId(): string {
    return Math.random().toString().substring(2) + Math.random().toString().substring(2);
}

export function getMonthlyCostId(req: Request, year: number, month: number): string {
    return `${req.headers.userName}.${year}.${month}`;
}