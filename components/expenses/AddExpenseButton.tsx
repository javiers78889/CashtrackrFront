"use client"

import { Button } from "@headlessui/react"
import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
    const router = useRouter()
    return (
        <>
            <Button onClick={() => router.push('?addExpense=true&showModal=true')} type="button" className={'bg-amber-500 text-white px-10 py-2 cursor-pointer rounded-lg text-lg font-bold'}>Agregar Gasto</Button>

        </>
    )
}
