"use server"

import { ErrorResponseSchema, ForgotSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionForgotPassword = {
    success: string,
    errors: string[]
}

export const forgotPassword = async (prevstate: ActionForgotPassword, formData: FormData) => {
    const forgotData = {
        email: formData.get('email')
    }
    const RecoverData = ForgotSchema.safeParse(forgotData)

    if (!RecoverData.success) {
        const error = RecoverData.error.errors.map(errores => errores.message)

        return {
            success: '',
            errors: error
        }
    }
    const email = RecoverData.data?.email
    console.log(JSON.stringify(email))
    const url = `${process.env.API_URL}/auth/forgot-password`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: RecoverData.data.email })
    })

    const json = await req.json()
    console.log(json)

    if (!req.ok) {

        const errores = ErrorResponseSchema.parse({ error: json })

        return {
            success: '',
            errors: [errores.error]
        }
    }

    console.log(json)
    const exito = SuccessSchema.parse(json)

    return {
        success: exito,
        errors: []
    }

}