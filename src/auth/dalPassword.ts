import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

export const VerifyTokenPassword = cache(async () => {
    try {
        const token = cookies().get('tokenreset')?.value

        if (!token) {
            console.log('No token found, redirecting...')
            redirect('/auth/login')
        }

        const url = `${process.env.API_URL}/auth/confirm-token`

        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })

        if (!req.ok) {
            console.log('Invalid token, redirecting...')
            redirect('/auth/login')
        }

        return { isAuth: true }
    } catch (error) {
        console.error('Error in VerifyTokenPassword:', error)
        redirect('/auth/login')
    }
})
