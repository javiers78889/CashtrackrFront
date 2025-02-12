"use client"
import { CircularProgressbar, buildStyles, } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';


import React from 'react'

export default function ProgressBar({ porcentaje }: { porcentaje: number }) {
    return (
        <div className='flex justify-center p-10'>

            <CircularProgressbar styles={buildStyles({
                pathColor: porcentaje >= 100 ? '#DC2626' : '#F59E0B',
                trailColor: '#e1e1e1',
                textColor: porcentaje >= 100 ? '#DC2626' : '#F59E0B',
                textSize: 8
            })} text={porcentaje<100?`${porcentaje}% gastado`:'Gastos Excedidos'} value={porcentaje} />


        </div>
    )
}
