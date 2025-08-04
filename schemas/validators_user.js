import { z } from 'zod';

export const registerSchema =z.object({ 
   
    name: z.string({required_error: 'El nombre es obligatorio' }).min(3, 'El nombre es obligatorio').max(50),
    email: z.string({required_error: 'El email es obligatorio' }).email('El correo electrónico no es válido'),
    password: z.string({required_error: 'La contraseña es obligatoria' }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
    telefono: z.string().optional(),
    about: z.string().optional(),
    role_name: z.string({required_error: 'El rol es obligatorio' })
});



export const validateLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

    