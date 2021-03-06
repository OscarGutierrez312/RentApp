import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

export default function Header(){
    
    const {data: session} = useSession()
    const infoV = {id:"0"};
    const infoMc = {id:"1"}
    const infoBc = {id:"2"};   
    //console.log(session)
    return(
        <header className="z-0 ">
            <nav
                className="navbar navbar-expand-md shadow-lg py-2 bg-white flex items-stretch w-full justify-between fixed top-0 right-0 left-0 z-10"
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
                        <Link href="/Catalogue/Vehicle" >
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Vehiculos</a>
                        </Link>                            
                    </li>
                    <li className="nav-item">
                        <Link href="/Catalogue/Motorbike" >
                            <a
                            className="nav-link block p-2 text-gray-600 hover:text-blue-500 focus:text-sky-400/50 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            >Motocicletas</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/Catalogue/Bycicle" >
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
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
                        >
                            Sign in                    
                        </button>
                    </Link>  
                 : 
                 <div className="grid grid-flow-col auto-cols-max gap-x-3 items-center">
                    <div className="m-3 inline-flex relative w-fit">
                        <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 p-1.5 text-xs bg-red-600 rounded-full z-10"></div>
                        <Link href={"/User/notifications"}>
                            <div className="px-4 py-3 bg-blue-500 flex items-center justify-center text-center rounded-lg shadow-lg cursor-pointer">
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="mx-auto text-white w-7" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        
                    </div>
                    <div >{session.user.name}</div>
                    <div >
                        <button 
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }}>
                            LogOut
                        </button>
                    </div>
                    <div className="cursor-pointer">
                        <Link href={"/User/userPage"}>
                            <img
                                src={session.user.image}
                                className="rounded-lg w-12 hover:scale-125 transition duration-300 ease-in-out"
                                alt="Avatar"                           
                            />
                        </Link>
                        
                    </div>                
                </div>
                }
                </div>
            </div>            
            </nav>
        </header>
    );       
}