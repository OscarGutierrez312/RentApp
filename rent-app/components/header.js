import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

export default function Header(){
    
    const {data: session, status} = useSession()

    return(
        <header className="z-0">
            <nav
                className="navbar navbar-expand-md shadow-lg py-2 bg-white flex items-stretch w-full justify-between fixed top-0 right-0 left-0"
            >
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <button
                    className="navbar-toggler border-0 py-3 px-2 md:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContentM"
                    aria-controls="navbarSupportedContentM"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="w-5"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    >
                    <path
                        fill="currentColor"
                        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    ></path>
                    </svg>
                </button>
                <div className="navbar-collapse collapse grow items-center z-0" id="navbarSupportedContentM">
                    <ul className="navbar-nav mr-auto flex flex-col lg:flex lg:flex-row md:flex-row">
                    <li className="nav-item">
                        <Link href="/">
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Inicio</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="#!">
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Vehiculos</a>
                        </Link>                            
                    </li>
                    <li className="nav-item">
                        <Link href="">
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Motocicletas</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="#!">
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Bicicletas</a>
                        </Link>                            
                    </li>
                    </ul>
                </div>  
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {!session ?     
                    <Link href="/Sesion/login">
                        <button
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign in                    
                        </button>
                    </Link>            
                    
                
                 : <button 
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}>
                        LogOut
                    </button>
                }
                </div>
            </div>
            
            
            </nav>
        </header>
    );        
    
    
}