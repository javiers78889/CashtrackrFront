
import { getToken } from "@/src/auth/token"
import { BudgetsAPIResponseSchema } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: 'CashTrackr - Panel Admin',
    description: 'CashTrackr - Panel Admin'
}

const getBudgets = async () => {
    const token = getToken()

    const url = `${process.env.API_URL}/budgets`


    const req = await fetch(url, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })


    const json = await req.json()
    const validar = BudgetsAPIResponseSchema.parse(json)
    return validar

}

export default async function pageAdmin() {


    const datos = await getBudgets()
    console.log(datos)


    return (

        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">presupuestos</span>
                    </p>
                </div>
                <Link
                    href={'/admin/budget/new'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Presupuesto
                </Link>
            </div>


            {datos.length ? (

                <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                    {datos.map((budget) => (
                        <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link href={`admin/budgets/${budget.id}`} className="cursor-pointer hover:underline text-2xl font-bold">
                                            {budget.name}
                                        </Link>
                                    </p>
                                    <p className="text-xl font-bold text-amber-500">
                                        {formatCurrency(Number(budget.amount))}
                                    </p>
                                    <p className='text-gray-500  text-sm'>
                                        {budget.id}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">

                            </div>
                        </li>
                    ))}
                </ul>
            ) : (

                <p className="text-center py-20">No hay presupuestos registrados. <Link className="font-bold" href={'/admin/budget/new'}>Crea uno</Link></p>
            )}

        </>



    )
}
