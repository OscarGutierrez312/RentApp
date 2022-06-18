import Image from "next/image";
import styles from "./footer.module.css"

export default function Header(){

    return (
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
    );
}