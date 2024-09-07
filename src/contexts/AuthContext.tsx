import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
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

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AhtuProvideProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const isAuthenticated = !!user.name; // CONVERÇÃO DE STRING PARA BOOLEAN COM O SINAL !!

    useEffect(() => {
        async function getUser() {
            // PEGANDO OS DADOS DO ASYNCSTORAGE
            const userInfor = await AsyncStorage.getItem('@sugeitopizzaria')
            let hasUSer: UserProps = JSON.parse(userInfor || '{}')

            // VERIFICAR SE RECEBEMOS AS INFORMAÇÕES DELE
            if (Object.keys(hasUSer).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUSer.token}`

                setUser({
                    id: hasUSer.id,
                    name: hasUSer.name,
                    email: hasUSer.email,
                    token: hasUSer.token
                })
            }

            setLoading(false)
        }

        getUser()
    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {
                email, password
            })

            const { id, name, token } = response.data;

            const data = { ...response.data }

            await AsyncStorage.setItem('@sugeitopizzaria', JSON.stringify(data))
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({ id, name, email, token })

            setLoadingAuth(false)

        } catch (error) {
            console.log('erro ao acessar ', error)
            setLoadingAuth(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, loadingAuth }} >
            {children}
        </AuthContext.Provider>
    )
}