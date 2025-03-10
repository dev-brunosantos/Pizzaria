import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // VERIFICANDO SE O EMAIL EXISTE
        const user = await prismaClient.user.findFirst({
            where: { email: email }
        })
        if (!user) {
            throw new Error("User/password incorrect")
        }
        // VERIFICANDO SE A SENHA ESTA CORRETA
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("User/password incorrect")
        }
        // SE DEU TUDO CERTO, SERÁ GERADO UM TOKEN PRO USUÁRIO
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '10d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }