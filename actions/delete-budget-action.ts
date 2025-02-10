"use server"

import { getToken } from "@/src/auth/token"
import { Budget, ErrorResponseSchema, PasswordValidation, SuccessSchema } from "@/src/schemas"
import { error } from "console"
import { revalidatePath } from "next/cache"


type TBudget = {
    errors: string[],
    success: string[]
}

export const DeleteBudget = async (deleteBudgetId: Budget['id'], prevState: TBudget, formData: FormData) => {
    const pwd = formData.get('password')
    const passwordValidate = PasswordValidation.safeParse(pwd)

    if (!passwordValidate.success) {
        const errors = passwordValidate.error.errors.map(errores => errores.message)
        return {
            success: [],
            errors
        }
    }
    const password = passwordValidate.data
    const success = []
    const url = `${process.env.API_URL}/auth/check-password`
    const token = getToken()

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
    })

    const validatePassword = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse({ error: validatePassword })

        console.log(error)

        return {
            errors: [error],
            success: []
        }
    }

    const validado = SuccessSchema.parse(validatePassword)

    success.push(validado)
    const url2 = `${process.env.API_URL}/budgets/${deleteBudgetId}`

    const req2 = await fetch(url2, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })

    const eliminado = await req2.json()


    if (!req2.ok) {
        const { error } = ErrorResponseSchema.parse({ error: eliminado })

        return {
            errors: [error],
            success: []
        }
    }


    const respuestaDelete = SuccessSchema.parse(eliminado)
    success.push(respuestaDelete)

    revalidatePath('/admin')

    return {

        errors: [],
        success
    }

}