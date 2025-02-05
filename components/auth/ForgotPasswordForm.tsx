"use client"

import { forgotPassword } from "@/actions/forgot-password-action"
import { stat } from "fs"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function ForgotPasswordForm() {
    const ref = useRef(null)
    const [state, dispatch] = useFormState(forgotPassword, {
        errors: [],
        success: ''
    })

    useEffect(() => { //aquí van los mensajes
        if (state.success) {
            toast.success(state.success)
        }
        if (state.errors) {
            state.errors.map(n =>

                toast.error(n)

            )
        }
    }, [state])
    return (
        <form
            action={dispatch}
            ref={ref}
            className=" mt-14 space-y-5"
            noValidate
        >
            <div className="flex flex-col gap-2 mb-10">
                <label
                    className="font-bold text-2xl"
                >Email</label>

                <input
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <input
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}
