"use server"

import { getToken } from "@/src/auth/token"
import { CreateBugetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type TExpense = {
    success: string,
    errors: string[]
}

export const CreateExpense = async (id: number, prevState: TExpense, formData: FormData) => {

    const url = `${process.env.API_URL}/budgets/${id}/expenses`
    const token = getToken()
    const DataExpense = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const validarDatos = CreateBugetSchema.safeParse(DataExpense)


    if (!validarDatos.success) {

        const errors = validarDatos.error.errors.map(errores => errores.message)
        return {
            success: '',
            errors
        }
    }

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: validarDatos.data.name,
            amount: validarDatos.data.amount
        })
    })

    const json = await req.json()


    if (!req.ok) {
        const {error} = ErrorResponseSchema.parse({ error: json })

        return{
            success:'',
            errors:[error]
        }
    }

    revalidatePath('expenses')
    const success = SuccessSchema.parse(json)

    return {
        success,
        errors: []
    }
}