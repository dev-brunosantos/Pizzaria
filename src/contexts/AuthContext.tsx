import React, { useState, createContext, ReactNode } from "react";

type AuthContextData = {
    user: UserProps;
    isAuthenticate: boolean
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AhtuProvideProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AhtuProvideProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const isAuthenticate = !!user.name; // CONVERÇÃO DE STRING PARA BOOLEAN COM O SINAL !!

    return (
        <AuthContext.Provider value={{ user, isAuthenticate }} >
            {children}
        </AuthContext.Provider>
    )
}