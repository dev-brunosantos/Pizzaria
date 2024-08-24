import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { ModalOrder } from '../modal'

import { OrderProps } from '@/lib/order.type'

interface Props {
    orders: OrderProps[]
}

export function Orders({ orders }: Props) {
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
                        <button key={order.id} className={styles.orderItem}>
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    ))}
                </section>
            </main>

            <ModalOrder />
        </>
    )
}