"use server"

import { ErrorResponseSchema, NewPasswordSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type TChange = {
    success: string,
    errors: string[]
}

export const changePassword = async (prevState: TChange, formData: FormData) => {
    const token = cookies().get('tokenreset')
    const url = `${process.env.API_URL}/auth/reset-password/${token?.value}`
    const Credenciales = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const validacion = NewPasswordSchema.safeParse(Credenciales)

    if (!validacion.success) {
        const errors = validacion.error.errors.map(errores => errores.message)
        return {
            errors,
            success: ''
        }
    }
    const password = validacion.data.password
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
    const json = await req.json()
    console.log(token)
    if (!req.ok) {
        const errores= ErrorResponseSchema.parse({error:json})
        return{
            success:'',
            errors:[errores.error]
        }
    }
    const success= SuccessSchema.parse(json)

    cookies().delete('tokenreset')

    return {
        success,
        errors: []
    }
}