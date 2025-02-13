"use client"

import { ChangeProfile } from "@/actions/change-profileinfo-action"
import { User } from "@/src/schemas"
import { stat } from "fs"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function ProfileForm({ datos }: { datos: User }) {
    const ref = useRef<HTMLFormElement>(null)
    const { name, email } = datos
    const [state, dispatch] = useFormState(ChangeProfile, {
        success: '',
        errors: []
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
        }
        if (state.errors) {
            state.errors.map(errores => {
                toast.error(errores)
            })
        }
    }, [state])

    return (
        <>
            <form
                className=" mt-14 space-y-5"
                ref={ref}
                action={dispatch}
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Tu Nombre"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="name"
                        defaultValue={name}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                        defaultValue={email}
                    />
                </div>

                <input
                    type="submit"
                    value='Guardar Cambios'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
