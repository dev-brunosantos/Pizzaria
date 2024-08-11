"use client"

import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export function Header() {

    const router = useRouter();

    function handleLogout() {
        deleteCookie("session", { path: "/" })

        router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <h1 className={styles.text} style={{ color: 'var(--white)' }}>
                        Sujeito
                        <span style={{ color: 'var(--red-900)', marginLeft: '-8px' }}>
                            Pizza
                        </span>
                    </h1>
                </Link>

                <nav>
                    <Link href="/dasboard/category">
                        Categoria
                    </Link>
                    <Link href="/dasboard/product">
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