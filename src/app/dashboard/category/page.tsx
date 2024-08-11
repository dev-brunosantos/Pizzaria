import { Button } from '../components/button'
import styles from './styles.module.scss'

export default function Category() {

    async function handleRegisterCategory() {
        "use server"
    }

    return(
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form
                className={styles.form}
                action={handleRegisterCategory}
            >
                <input 
                    type="text" 
                    name='name'
                    placeholder='Nome da Categoria, ex: Pizzas'
                    required
                    className={styles.input}
                />

                <Button 
                    name='Cadastrar'
                />
            </form>
        </main>
    )
}