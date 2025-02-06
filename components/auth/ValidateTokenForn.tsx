"use client"

import { ValidateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ValidateTokenForm() {
  const [toke, setToken] = useState('')
  const router = useRouter()
  const ConfirmToken = ValidateToken.bind(null, toke)
  const [state, dispatch] = useFormState(ConfirmToken, {
    success: '',
    errors: []
  })

  const [cambio, setCambio] = useState(false)
  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = () => {
    setCambio(!cambio)
  }

  useEffect(() => {
    dispatch()
  }, [cambio])
  useEffect(() => {
    if (state.errors) {
      if (toke.length === 6) {
        state.errors.map(error => {

          toast.error(error)
        })
      }
      if (state.success) {
        toast.success(state.success, {
          onClose: () => {
            router.push('/auth/reset-password')
          }
        })
      }
    }
  }, [state])

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={toke}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}
