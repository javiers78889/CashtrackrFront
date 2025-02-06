"use server"

import { getToken } from "@/src/auth/token"
import { CreateBugetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type TBudget = {
    success: string,
    errors: string[]
}

export const createBudget = async (prevState: TBudget, formData: FormData) => {
    const url = `${process.env.API_URL}/budgets`
    const token =getToken()
    console.log(Number(formData.get('amount')))
    const Datos = {
        name: formData.get('name'),
        amount: Number(formData.get('amount'))
    }

    const DatosValidados = CreateBugetSchema.safeParse(Datos)

    if (!DatosValidados.success) {
        const errors = DatosValidados.error.errors.map(errores => errores.message)
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
        body: JSON.stringify(DatosValidados.data)
    })

    const json = await req.json()
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse({ error: json })

        return {
            success: '',
            errors: [error]
        }
    }


    const correcto = SuccessSchema.parse(json)

    return {
        success: correcto,
        errors: []
    }
}