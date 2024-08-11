import Link from 'next/link'
import styles from './page.module.scss'

export default function Page() {
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
          <form>
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