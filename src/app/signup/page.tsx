import Link from "next/link";
import { api } from "@/src/services/api"
import { redirect } from 'next/navigation'
import styles from '../page.module.scss'

export default function Signup() {

    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        if (name === "" || email === "" || password === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return;
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })
        } catch (error) {
            console.log("Error")
            console.log(error)
        }

        redirect("/")
    }

    return (
        <>
            <div className={styles.containerCenter}>
                {/* AQUI FICARÁ A IMAGEM DALOGO */}
                <h1 className={styles.text} style={{ fontSize: '3.5rem' }}>
                    Sujeito
                    <span style={{ color: 'var(--red-900)', marginLeft: '-13px' }}>
                        Pizza
                    </span>
                </h1>

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            required
                            name='name'
                            placeholder='Digite seu nome'
                            className={styles.input}
                        />
                        <input
                            type="text"
                            required
                            name='email'
                            placeholder='Digite seu email'
                            className={styles.input}
                        />
                        <input
                            type="password"
                            required
                            name='password'
                            placeholder='********'
                            className={styles.input}
                        />

                        <button type='submit' className={styles.button}>
                            Cadastrar
                        </button>
                    </form>

                    <Link href='/' className={styles.text}>
                        Já possui uma conta? Faça o login
                    </Link>
                </section>
            </div>
        </>
    )
}