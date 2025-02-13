"use server"
import { getToken } from "@/src/auth/token"
import { ChangeUserPasswordSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"

type TChange = {
    success: string[],
    errors: string[]
}

export const ChangeUserPassword = async (prevState: TChange, formData: FormData) => {
    const success = []
    const urlPassword = `${process.env.API_URL}/auth/check-password`
    const token = getToken()
    const Data = {
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const validar = ChangeUserPasswordSchema.safeParse(Data)
    console.log(validar.data)
    if (!validar.success) {
        const errors = validar.error.errors.map(n => n.message)
        return {
            errors,
            success: []
        }
    }

    const reqPassword = await fetch(urlPassword, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: validar.data.current_password })
    })

    const jsonPassword = await reqPassword.json()
    console.log(jsonPassword)

    if (!reqPassword.ok) {
        const { error } = ErrorResponseSchema.parse({ error: jsonPassword })

        return {
            errors: [error],
            success: []
        }
    }

    const successPassword = SuccessSchema.parse(jsonPassword)
    success.push(successPassword)

    const urlUpdate = `${process.env.API_URL}/auth/update-password`

    const reqUpdate = await fetch(urlUpdate, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: validar.data.current_password,
            password: validar.data.password
        })
    })

    const jsonUpdate = await reqUpdate.json()
   

    if (!reqUpdate.ok) {
        const { error } = ErrorResponseSchema.parse({ error: jsonUpdate })

        return {
            errors: [error],
            success: []
        }
    }

    const successUpdate = SuccessSchema.parse(jsonUpdate)
    success.push(successUpdate)


    return {
        success,
        errors: []
    }
}