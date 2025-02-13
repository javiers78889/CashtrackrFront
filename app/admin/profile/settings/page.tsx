import ProfileForm from "@/components/profile/ProfileForm";
import { getToken } from "@/src/auth/token";
import { UserSchema } from "@/src/schemas";
const getUser = async () => {
  const url = `${process.env.API_URL}/auth/user`
  const token = getToken()
  const req = await fetch(url, {
    headers: {
      'authorization': `Bearer ${token}`
    },
    next: { tags: ['Datos'] }
  })
  const json = await req.json()
  const validar = UserSchema.parse(json)

  return validar
}
export default async function EditProfilePage() {
  const datos = await getUser()
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950 my-5">Actualizar Perfil</h1>
      <p className="text-xl font-bold">Aquí puedes cambiar los datos de tu {''}
        <span className="text-amber-500">perfil</span>
      </p>
      <ProfileForm datos={datos} />
    </>
  )
}
