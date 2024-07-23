import prismaClient from "../../prisma";

interface UserRequest {
    name: String | any;
    email: String | any;
    password: String | any;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        // verificar se ele envou um e-mail
        if(!email) {
            throw new Error("Email incorrect")
        }
        // verficar se esse email ja esta cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({ 
            where: {
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error('User already exists')
        }

        const user = await prismaClient.user.create({
            data: {
                name: name, 
                email: email, 
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }
