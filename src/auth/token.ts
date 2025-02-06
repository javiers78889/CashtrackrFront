import { cookies } from "next/headers"

export const getToken = () => {
    const token = cookies().get('jwt')?.value


    return token
}