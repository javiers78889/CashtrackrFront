import "server-only"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"
import { cache } from "react"
import { getToken } from "./token"


export const verifySession = cache(async () => {
    const jwt = getToken()

    if (!jwt) {
        redirect('/auth/login')
    }

    const url = `${process.env.API_URL}/auth/user`

    const req = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })

    const session = await req.json()

    const result = UserSchema.safeParse(session)

    if (!result.success) {
        redirect('/auth/login')
    } else {

        return {
            user: result.data,
            isAuth: true
        }
    }
})