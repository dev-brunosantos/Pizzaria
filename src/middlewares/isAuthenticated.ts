import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(
    req:Request, res:Response, next: NextFunction
) {
    // RECEBENDO O TOKEN
    const authToken = req.headers.authorization;

    if(!authToken) { return res.status(401).end(); }

    const [, token] = authToken.split(" ")

    try {
        // VALIDANDO O TOKEN
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload; 
        // RECUPERANDO O ID DO TOKEN E ADICIONANDO DENTRO DE UMA VARIÁVEL USER_ID DENTRO DO REQ
        req.user_id = sub;
        
        return next();
        
    } catch (error) {
        return res.status(401).end();
    }
}