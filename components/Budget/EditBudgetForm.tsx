"use client"
import { Budget } from '@/src/schemas'
import BugetItemsForm from './BudgetItemsForm/BugetItemsForm'
import { toast } from 'react-toastify'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { editBudget } from '@/actions/edit-budget-action'


export default function EditBudgetForm({ data }: { data: Budget }) {
    const ref = useRef<HTMLFormElement>(null) // evita que se recargue la pantalla al hacer submit
    const router = useRouter()
    const params = editBudget.bind(null, data.id)
    const [state, dispatch] = useFormState(params, {
        success: '',
        errors: []
    })


    useEffect(() => {
        if (state.success) {
            ref.current?.reset()
            toast.success(state.success, {
                onClose: () => {
                    router.push('/admin')
                }
            })
        }
        if (state.errors) {
            state.errors.map(errores => {
                toast.error(errores)
            })
        }
    }, [state])



    return (
        <form
            action={dispatch}

            className="mt-10 space-y-3"
            noValidate
        >
            <BugetItemsForm data={data} />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Guardar Cambios'
            />
        </form>
    )
}
