"use client"

import { createBudget } from "@/actions/create-budget-action"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function CreateBudgetForm() {
  const ref = useRef<HTMLFormElement>(null) // evita que se recargue la pantalla al hacer submit
  const router = useRouter()
  const [state, dispatch] = useFormState(createBudget, {
    success: '',
    errors: []
  })


  useEffect(() => {
    if (state.success) {
      ref.current?.reset()
      toast.success(state.success,{
        onClose:()=>{
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
      ref={ref}
      className="mt-10 space-y-3"
      noValidate
    >
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del Presupuesto"
          name="name"
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Cantidad Presupuesto"
          name="amount"
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}
