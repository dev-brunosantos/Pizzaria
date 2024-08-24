import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { Orders } from "./components/orders";
import { OrderProps } from '@/lib/order.type'

// FUNÇÃO PARA PEGAR OS PEDIDOS ABERTOS
async function getOrders():Promise<OrderProps[] | []> {
    try {
        const token = getCookieServer();
        const response = await api.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data || []
    } catch (error) {
        console.log(error)
        return [];
    }
}

export default async function Dashboard() {

    const orders = await getOrders();

    console.log(orders)

    return (
        <>
            <Orders orders={orders} />
        </>
    )
}