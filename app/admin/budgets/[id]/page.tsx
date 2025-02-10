import AddExpenseButton from '@/components/expenses/AddExpenseButton'
import ModalContainer from '@/components/ui/ModalContainer'
import { getToken } from '@/src/auth/token'
import { BudgetsAPIResponseSchema } from '@/src/schemas'
import { getBudget } from '@/src/services'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = params
    const budget = await getBudget({ id })
    return {
        title: `Cashtrackr - ${budget[0].name}`,
        description: "Generated by create next app",
    }
}
const getBudgets = async (id: number) => {
    const token = getToken()

    const url = `${process.env.API_URL}/budgets/${id}`


    const req = await fetch(url, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })


    const json = await req.json()
    console.log(json)
    const validar = BudgetsAPIResponseSchema.parse([json])
    return validar

}
export default async function BudgetsDetailsPage({ params }: { params: Params }) {

    const { id } = params

    const budget = await getBudgets(+id)


    return (
        <>
        <div className='flex justify-between items-center'>
            <div>
                <h1 className="font-black text-4xl text-purple-950">{budget[0].name}</h1>
                <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
            </div>
            <AddExpenseButton />
        </div>

        <ModalContainer/>
        </>
    )
}
