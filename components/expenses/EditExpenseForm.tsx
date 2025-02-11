"use client"
import { DialogTitle } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import ExpenseForm from './ExpenseForm'
import { useParams, useSearchParams } from 'next/navigation'
import { Expenses } from '@/src/schemas'

export default function EditExpenseForm() {
  const { id } = useParams()
  const searchparam = useSearchParams()
  const [datos, setDatos] = useState({} as Expenses)
  const editExpenseId = searchparam.get('editExpenseId')
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${id}/expenses/${editExpenseId}`
    fetch(url).then(res => res.json()).then(data => setDatos(data))

  }, [])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y Edita tu {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        action={() => { }}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm datos={datos} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Editar Gasto'
        />
      </form>

    </>
  )
}
