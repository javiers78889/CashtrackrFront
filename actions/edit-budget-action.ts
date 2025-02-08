"use server"

import { getToken } from "@/src/auth/token"
import { Budget, CreateBugetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type TBudget = {
    success: string,
    errors: string[]
}

export const editBudget = async (id: Budget['id'], prevState: TBudget, formData: FormData) => {
    const url = `${process.env.API_URL}/budgets/${id}`
    const token = getToken()

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
        method: 'PUT',
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

    revalidatePath('/admin')

    return {
        success: correcto,
        errors: []
    }
}