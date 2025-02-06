"use server"
import { ErrorResponseSchema, SuccessSchema, ValidateTokenSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type TValidate = {
    success: string,
    errors: string[]
}

export const ValidateToken = async (token: string, prevState: TValidate) => {
    
    const validar = ValidateTokenSchema.safeParse(token)
   
    const url = `${process.env.API_URL}/auth/confirm-token`

    if (validar.error) {
        const errores = validar.error.errors.map(error => error.message)

        return {
            success: '',
            errors: errores
        }
    }
    
    const req = await fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: validar.data })
    })

    const json = await req.json()
    if (!req.ok) {
        const errores = ErrorResponseSchema.parse({ error: json })

        return{
            errors:[errores.error],
            success:''
        }
    }

    const success= SuccessSchema.parse(json)

    cookies().set('tokenreset',validar.data)

    return {
        success,
        errors: []
    }
}