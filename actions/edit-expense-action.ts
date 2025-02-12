"use server"

import { getToken } from "@/src/auth/token"
import { Budget, CreateBugetSchema, ErrorResponseSchema, Expenses, SuccessSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"

type TEdit = {
    success: string,
    errors: string[]
}

export const editExpense = async (budgetId: Budget['id'], expenseId: Expenses['id'], prevState: TEdit, formData: FormData) => {
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    console.log(url)
    const token = getToken()
    const data = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }


    const validarData = CreateBugetSchema.safeParse(data)

    if (!validarData.success) {
        const errors = validarData.error.errors.map(err => err.message)

        return {
            errors,
            success: ''
        }
    }

    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(validarData.data)
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    revalidateTag('expenses')
    const success= SuccessSchema.parse(json)
    return {
        success: success,
        errors: []
    }

}