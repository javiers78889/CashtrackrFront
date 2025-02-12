"use client"
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { deleteExpense } from "@/actions/delete-expense-action";
import { useEffect } from "react";
import { toast } from "react-toastify";
import exp from "constants";


export default function DeleteExpenseForm() {
  const { id: budgetId } = useParams()!
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('deleteExpenseId')!

  const budget = +budgetId
  const expense = +expenseId
  const path = usePathname()
  const router = useRouter()
  const deleteParams = deleteExpense.bind(null, { budget, expense })
  const [state, dispatch] = useFormState(deleteParams, {
    success: '',
    errors: []
  })
  const closeModal = () => {
    router.replace(path)
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      router.replace(path)
    }

    if (state.errors) {
      state.errors.map(errores => {

        toast.error(errores)
      })
    }
  }, [state])


  useEffect(()=>{
    if(!Number.isInteger(+budget) ||!Number.isInteger(expense)){
      closeModal()
    }
  },[])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Confirma para eliminar, {''}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un gasto eliminado no se puede recuperar)</p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >Cancelar</button>
        <button
          type='button'
          onClick={() => dispatch()}
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
        >Eliminar</button>
      </div>
    </>
  )
}

