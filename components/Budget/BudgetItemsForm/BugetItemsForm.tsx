import { Budget } from '@/src/schemas'
import React from 'react'

export default function BugetItemsForm({ data }: { data?: Budget }) {
    const { name, amount } = data??{}
    return (
        <>
            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre Presupuesto
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100 bg-slate-100"
                    type="text"
                    defaultValue={name ? name : ''}
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
                    defaultValue={amount ? amount : ''}
                    name="amount"
                />
            </div>

        </>
    )
}
