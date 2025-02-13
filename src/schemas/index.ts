import { z } from 'zod'


export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'El email es obligatorio' }).email({ message: 'Email no válido' }),
    name: z.string().min(1, { message: 'El nombre no puede ir vacío' }),
    password: z.string().min(8, { message: 'El password debe tener mínimo 8 carácteres' }),
    password_confirmation: z.string()

}).refine((data) => data.password === data.password_confirmation, { message: 'Los password no son iguales', path: ['password_confirmation'] })

export const SuccessSchema = z.string().min(1, { message: 'Valor no valido' })

export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const ConfirmAccountSchema = z.string().min(6, { message: 'Token no valido, muy corto' }).max(6, { message: 'Token no valido' })
export const ValidateTokenSchema = z.string().min(6, { message: 'Token no valido, muy corto' }).max(6, { message: 'Token no valido' })

export const LoginSchema = z.object({
    email: z.string().min(1, { message: 'El email es Obligatorio para iniciar sesion' }).email({ message: 'No es un formato válido para email' }),
    password: z.string().min(1, { message: 'El Password no puede ir vacío' })
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export type User = z.infer<typeof UserSchema>

export const ForgotSchema = z.object({
    email: z.string().min(1, { message: 'Ingrese un Email' }).email('Email no válido')
})


export const NewPasswordSchema = z.object({
    password: z.string().min(8, { message: 'El password debe tener minimo 8 caracteres' }),
    password_confirmation: z.string().min(8, { message: 'El password debe tener minimo 8 caracteres' })
}).refine((data) => data.password === data.password_confirmation, { message: 'Los password no coinciden' })


//budgets schemas


export const CreateBugetSchema = z.object({
    name: z.string().min(1, { message: 'Introduzca un nombre mas largo' }),
    amount: z.coerce.number({ message: 'El presupuesto debe ser numérico' }).min(1, { message: 'Monto no válido' })
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
})
export const ExpsenseSchema = z.object({
    id: z.number().min(1, { message: 'id no válido' }),
    name: z.string().min(1, { message: 'name no válido' }),
    amount: z.coerce.number({ message: 'el monto debe ser numérico' }).min(1, { message: 'monto no válido' }),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number().min(1, { message: 'id no válido' })
})
export type Expenses = z.infer<typeof ExpsenseSchema>


export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    expenses: z.array(z.object({
        id: z.number().min(1, { message: 'id no válido' }),
        name: z.string().min(1, { message: 'name no válido' }),
        amount: z.coerce.number({ message: 'el monto debe ser numérico' }).min(1, { message: 'monto no válido' }),
        createdAt: z.string(),
        updatedAt: z.string(),
        budgetId: z.number().min(1, { message: 'id no válido' })
    }))
})

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema)

export type Budget = z.infer<typeof BudgetAPIResponseSchema>

export const PasswordValidation = z.string().min(1, { message: 'Password no valido' })

export const ChangeUserPasswordSchema = z.object({
    current_password: z.string(),
    password: z.string().min(8, { message: 'El password debe tener minimo 8 caracteres' }),
    password_confirmation: z.string().min(8, { message: 'El password debe tener minimo 8 caracteres' })
}).refine((data) => data.password === data.password_confirmation, { message: 'Los password no coinciden' })
.refine((data) => data.password !== data.current_password, { message: 'El nuevo password debe ser diferente al anterior' })
