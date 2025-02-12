"use server"

import { getToken } from "@/src/auth/token"
import { ErrorResponseSchema, Expenses, SuccessSchema } from "@/src/schemas"
import exp from "constants"
import { revalidateTag } from "next/cache"

type TDelete = {
    success: string,
    errors: string[]
}

export const deleteExpense = async ({ budget, expense }: { budget: Expenses['budgetId'], expense: Expenses['id'] }, prevState: TDelete) => {
    const url = `${process.env.API_URL}/budgets/${budget}/expenses/${expense}`
    const token = getToken()
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            success: '',
            errors: [error]
        }
    }
    revalidateTag('expenses')
    const success = SuccessSchema.parse(json)
    return {
        success,
        errors: []
    }
}