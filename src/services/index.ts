import { notFound } from "next/navigation"
import { BudgetsAPIResponseSchema } from "../schemas"
import { getToken } from "../auth/token"
import { cache } from "react"

export const getBudget =    cache( async ({ id }: { id: number }) => {
    const url = `${process.env.API_URL}/budgets/${id}`
    const req = await fetch(url, {
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    })
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const budget = BudgetsAPIResponseSchema.parse([json])


    return budget


})