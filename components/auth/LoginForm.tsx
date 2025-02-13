"use client"

import { Login } from "@/actions/autenticate-user-action"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function LoginForm() {
    const router = useRouter()
    const ref = useRef<HTMLFormElement>(null) // evita que se recargue la pantalla al hacer submit

    const [state, dispatch] = useFormState(Login, {
        error: [],
        success: ''
    })

    useEffect(() => {
        if (!state.success) {
            const errores = state.error.map(errores => {

             

               return toast.error(errores)


            })
        }else{
            
            toast.success('validado', { onClose: () => { router.push('/admin') } })
            ref.current?.reset()
        }

    }, [state])
    return (
        <>
            <form
                action={dispatch}
                ref={ref}
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}