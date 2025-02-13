"use server"

import { getToken } from "@/src/auth/token"
import { ChangeUserSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"


type TChange = {
    success: string,
    errors: string[]
}

export const ChangeProfile = async (prevState: TChange, formdata: FormData) => {

    const url = `${process.env.API_URL}/auth/user`
    const token = getToken()
    const Data = {
        name: formdata.get('name'),
        email: formdata.get('email')
    }

    const ValidarData = ChangeUserSchema.safeParse(Data)

    if (!ValidarData.success) {
        const errors = ValidarData.error.errors.map(errors => errors.message)

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
        body: JSON.stringify({
            name: ValidarData.data.name,
            email: ValidarData.data.email
        })
    })
    const json = await req.json()

    if (!req.ok) {

        const { error } = ErrorResponseSchema.parse({error:json})

        return {
            errors: [error],
            success: ''
        }
    }

    revalidateTag('Datos')
    const success = SuccessSchema.parse(json)

    return {
        success,
        errors: []
    }
}