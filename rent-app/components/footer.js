import Image from "next/image";
import styles from "./footer.module.css"

export default function Header(){

    return (
    <footer class="text-white bg-gray-200" className={styles.footer}>
      <div class="grid place-items-center bg-gray-200 p-6">    
        
        <a class="flex items-center text-gray-600 font-semibold"
          href="https://www.udistrital.edu.co/inicio"
          target="_blank"
          rel="noopener noreferrer"
        > 
          
          <span>© 2022 Copyright:</span>
          <span>
            <Image src='/images/Escudo_UD.png' alt="Escudo Distrital" width={50} height={50} />
          </span>
        </a>
           
      </div>
        
      </footer>
    );
}