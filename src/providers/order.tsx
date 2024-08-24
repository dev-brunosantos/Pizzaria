"use client"

import { createContext, ReactNode, useState } from "react"
import { api } from '@/services/api'
import { GetCookieClient } from '@/lib/cookieClient'

interface OrderItemProps {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    order: {
        id: string;
        table: number;
        name: string | null;
        draft: boolean;
        status: boolean;
    }
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState<OrderItemProps[]>([])

    async function onRequestOpen(order_id: string) {

        const token = GetCookieClient();
        const response = await api.get('/orders/detail', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                order_id: order_id
            }
        })

        setOrder(response.data)

        setIsOpen(true)
    }

    function onRequestClose() {
        setIsOpen(false)
    }

    return (
        <OrderContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                order
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}