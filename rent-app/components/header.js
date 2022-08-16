import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { signOut, useSession } from "next-auth/react"
import React, { useRef, useState } from "react";
import ColorContext from "../context/ColorContext"

export default function Header(){
    
    const {data: session} = useSession()
    const infoV = {id:"0"};
    const infoMc = {id:"1"}
    const infoBc = {id:"2"};   
    
    const color = useContext(ColorContext)


    return(
        <header className="z-0 mt-32">
            {color ? 
            <nav className="navbar navbar-expand shadow-lg py-2 
            bg-white flex items-stretch w-full justify-between fixed top-0 right-0 left-0 z-10">
                <div className="px-10 w-full flex flex-wrap items-center justify-between static">
                    
                    <div className="navbar-collapse collapse grow items-center lg:-mr-52 xl:-mr-[790px] z-0" id="navbarSupportedContentM">
                        <ul className="navbar-nav mr-auto flex flex-col 
                        sm:
                        md:flex-row
                        lg:flex lg:flex-row lg:mr-0
                        xl:
                        ">
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
                    
                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
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
                            
                            
                        </div>
                        <div className="hidden xl:flex text-sm">{session.user.name}</div>
                        <div >
                            <button 
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#00708E] hover:bg-indigo-700"
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
            :
            <nav className="navbar navbar-expand shadow-lg py-2 
            bg-white flex items-stretch w-full justify-between fixed top-0 right-0 left-0 z-10">
                <div className="px-10 w-full flex flex-wrap items-center justify-between static">
                    
                    <div className="navbar-collapse collapse grow items-center lg:-mr-52 xl:-mr-[790px] z-0" id="navbarSupportedContentM">
                        <ul className="navbar-nav mr-auto flex flex-col 
                        sm:
                        md:flex-row
                        lg:flex lg:flex-row lg:mr-0
                        xl:
                        ">
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
                    
                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
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
                            
                            
                        </div>
                        <div className="hidden xl:flex text-sm">{session.user.name}</div>
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
            }
            
        </header>
    );       
}