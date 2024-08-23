"use client"

import Link from 'next/link'
import Image from 'next/image'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import logo from '/public/logo.svg'
import { toast } from 'sonner'

export function Header() {

    const router = useRouter();

    function handleLogout() {
        deleteCookie("session", { path: "/" })

        toast.success("Logout feito com sucesso.") // ALERTA PERSONALISADO

        router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image 
                        alt='Logomarca do projeto' 
                        src={logo}
                        width={190}
                        height={60} 
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#fff' />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}