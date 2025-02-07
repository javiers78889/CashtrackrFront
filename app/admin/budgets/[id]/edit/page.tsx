
import { getToken } from '@/src/auth/token'
import { BudgetsAPIResponseSchema } from '@/src/schemas'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import { notFound } from 'next/navigation'



export const getBudget = async ({ id }: { id: number }) => {
    const url = `${process.env.API_URL}/budgets/${id}`
    const req = await fetch(url, {
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    })
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const budget = BudgetsAPIResponseSchema.parse([json])


    return budget


}

export default async function page({ params }: { params: Params }) {
    const { id } = params
    const data = await getBudget({ id })
    console.log(data)

    console.log(id)
    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-purple-950 my-5'>
                        Editar Presupuesto:
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
                        <span className="text-amber-500">presupuesto</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10  shadow-lg border '>

            </div>
        </>
    )
}
