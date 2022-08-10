import Image from "next/image";


export default function Header(){

    return (
    <footer className="flex flex-col mt-auto w-full absolute pt-[115px] text-white" >
      <div className="grid place-items-center bg-gray-200 p-6">    
        
        <a className="flex items-center text-gray-600 font-semibold"
          href="https://www.udistrital.edu.co/inicio"
          target="_blank"
          rel="noopener noreferrer"
        > 
          
          <span>© 2022 Copyright:</span>
          <span>
            <Image src='/Util/Escudo_UD.png' alt="Escudo Distrital" width={50} height={50} />
          </span>
        </a>
           
      </div>
        
      </footer>
    );
}