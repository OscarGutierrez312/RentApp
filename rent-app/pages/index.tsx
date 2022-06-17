import Head from "next/head"
import Image from "next/image"

import styles from '../styles/Home.module.css'
import Layout from "../components/layout"


export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
      <Head>
        <title>Rent a Vehicle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a EasyCar
        </h1>

        <p className={styles.description}>
          Ejemplo de descripción de la página de inicio de la aplicación de renta de vehiculos
        </p>

        <div className={styles.grid}>
          
        <Link href="/Sesion/login">
          <a  className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Inicia Sesión en la aplicación.</p>
          </a>
        </Link>    
          
            
        <Link  href="/Sesion/signup">
          <a className={styles.card}>
            <h2>Sign Up &rarr;</h2>
            <p>Registrate en la aplicación.</p>
          </a>
        </Link>

        
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.udistrital.edu.co/inicio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/images/Escudo_UD.png' alt="Escudo Distrital" width={50} height={50} />
          </span>
        </a>
      </footer>
    </div>
    </Layout>
  )
}
