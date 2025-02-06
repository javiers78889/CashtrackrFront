import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { VerifyTokenPassword } from '@/src/auth/dalPassword'
import React from 'react'

export default async function page() {
    await VerifyTokenPassword()
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Reestablecer Password</h1>
            <p className="text-3xl font-bold">Introduce tu nuevo Password
                <span className="text-amber-500"> y Confirmalo</span>
            </p>

            <ResetPasswordForm />

        </>
    )
}
