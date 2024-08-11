import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.scss'
import { api } from '../services/api'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import logo from '/public/logo.svg'

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if(email === "" || password === "") {
      return;
    }

    try {
      
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token) {
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000
      cookies().set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })
      
    } catch (error) {
      console.log(error)
      return;
    }

    redirect("/dashboard")
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Logomarca do projeto' />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="text"
              required
              name='email'
              placeholder='Digite seu email...'
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
              Acessar
            </button>
          </form>

          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}