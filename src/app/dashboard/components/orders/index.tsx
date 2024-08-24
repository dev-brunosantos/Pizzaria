"use client"

import { use, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { ModalOrder } from '../modal'
import styles from './styles.module.scss'

import { OrderProps } from '@/lib/order.type'
import { OrderContext } from '@/providers/order'

import { api } from '@/services/api'
import { GetCookieClient } from '@/lib/cookieClient'

interface Props {
    orders: OrderProps[]
}

export function Orders({ orders }: Props) {

    const { isOpen, onRequestOpen } = use(OrderContext)

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id)
    }

    return (
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
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