import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        // PEGANDO AS INFORMAÇÕES ENVIADAS PELO FRONTEND
        const { name, email, password } = req.body
        // CRIA UMA NOVA INSTACIA DO "SERVIÇO"
        const createUserService = new CreateUserService()
        // PASSA AS INFORMAÇÕES DO BODY PARA O SERVIÇO
        const user = await createUserService.execute({ 
            name, 
            email, 
            password
        })
        // RETORNO DAS INFORMAÇÕES DO SERVIÇO
        return res.json(user)
    }
}

export { CreateUserController }