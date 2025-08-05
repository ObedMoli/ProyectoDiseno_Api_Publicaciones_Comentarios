import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { createUser, getUserByEmail, assingnUserRole, getRoleByName } from '../models/user_model.js';
import { registerSchema, validateLogin } from '../schemas/validators_user.js';
import { conflict, created, ok, unauthorized, badRequest } from '../utils/utils.js';

export const register = async (req, res, next) => {

    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {

            const validationErrors = result.error?.errors || [];

            return res.status(400).json(
                badRequest('Error de validación', validationErrors.map(e =>({
                    campo: e.path.join('.'), 
                    mensaje: e.message
                })))
            );
        }

        const { name, email, password, telefono, about, role_name } = result.data;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        const role = await getRoleByName(role_name);
        if (!role) {
            return res.status(400).json({ message: 'El rol no existe' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user_id = Buffer.from(uuidv4().replace(/-/g, ''), 'hex');

        await createUser({ user_id, name, email, password_hash, telefono, about });

        await assingnUserRole(user_id, role.role_id);

        res.status(201).json({ message: 'Usuario creado exitosamente' });

    } catch (error) {
        next(error);
    }

};


export const login = async (req, res, next) => {

    try {
        const result = validateLogin.safeParse(req.body);

        if (!result.success) {
            const errores = result.error?.errors || [];
            return res.status(400).json(
            badRequest('Error de validación', errores.map(e => ({
            campo: e.path.join('.'),
            mensaje: e.message
        })))
        );
        }

        const { email, password } = result.data;       

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json( unauthorized ( 'Credenciales inválidas' ));
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json( unauthorized ( 'Credenciales inválidas' ));
        }

       const token = jwt.sign(
        { user_id: user.user_id.toString('hex'), name: user.name },
         process.env.JWT_SECRET,
        { expiresIn: '1h' }
        );

       res.setHeader('Authorization', `Bearer ${token}`);

        res.status(201).json(ok('Inicio de sesión exitoso',{ token }));
        
    } catch (error) {
        next(error);
    }
};

