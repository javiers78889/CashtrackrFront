"use client"

import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import { CreateExpense } from "@/actions/create-Expense-action";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"

export default function AddExpenseForm() {
    const { id } = useParams()
    const params = CreateExpense.bind(null, +id)
    const path = usePathname()
    const router = useRouter()
    const [state, dispatch] = useFormState(params, {
        errors: [],
        success: ''
    })



    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push(path)
        }
        if (state.errors) {
            state.errors.map(errores => {
                toast.error(errores)
            })
        }
    }, [state])
    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                action={dispatch}
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
            >
                <ExpenseForm />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}
