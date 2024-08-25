"use client"

import { use } from 'react'
import { RefreshCw } from 'lucide-react'
import { ModalOrder } from '../modal'
import styles from './styles.module.scss'

import { OrderProps } from '@/lib/order.type'
import { OrderContext } from '@/providers/order'

import { useRouter } from 'next/navigation'

interface Props {
    orders: OrderProps[]
}

export function Orders({ orders }: Props) {

    const { isOpen, onRequestOpen } = use(OrderContext)

    const router = useRouter();

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id)
    }

    return (
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={() => router.refresh()}>
                        <RefreshCw size={24} color='var(--green-900)' />
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {orders.map(order => (
                        <button
                            key={order.id}
                            className={styles.orderItem}
                            onClick={() => handleDetailOrder(order.id)}
                        >
                            <div className={styles.tag} />
                            <span>Mesa {order.table}</span>
                        </button>
                    ))}
                </section>
            </main>

            {isOpen && <ModalOrder />}
        </>
    )
}