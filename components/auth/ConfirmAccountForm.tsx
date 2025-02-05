"use client"
import { ConfirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { stat } from 'fs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { Bounce, toast } from 'react-toastify'
export default function ConfirmAccountForm() {
    const router = useRouter()
    const [isComplete, setIscomplete] = useState(true)
    const [token, setToken] = useState("")
    const confirmAccountWithToken = ConfirmAccount.bind(null, token) // enviar el token al use server
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        error: [],
        success: ""
    })
    useEffect(() => {
        if (token.length === 6) { // Asegurarse de que el token está completo antes de despachar
            dispatch()
        }
    }, [isComplete])

    const onWrite = (data: string) => {
        setToken(data)
    }

    const Complete = () => {
        setIscomplete(!isComplete)
    }
    useEffect(() => {
        if (state.success) {
            toast.success(state.success, {onClose: ()=>{
                router.push('/auth/login')
            }})
        } if(state.error) {
            state.error.forEach(n =>{
                toast.error(n)
            })
          
        }
    }, [state])

    return (
        <div className='flex justify-center flex-col'>

            <div className='flex justify-center gap-5 my-10'>
                <PinInput
                    value={token}
                    onChange={onWrite}
                    onComplete={Complete}
                >

                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />
                    <PinInputField className='h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center' />



                </PinInput>

            </div>
        </div>
    )
}
