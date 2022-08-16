import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import LayoutUser from "../../components/layout_user";
import Image from "next/image";
import { useRef } from "react";
import { createClient } from "@supabase/supabase-js";

export default function UserPage({se, data}){
    const {data:session} = useSession();
    const formName = useRef()

    console.log(!session ? "undefined":session)
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const changeName = async (event) =>{
        formName.current.hidden == true ? formName.current.hidden = false:formName.current.hidden = true
    }

    
    

    const fields = async (event) => {
        event.preventDefault();
        const {upt, error} = await supabaseAdmin
                .from("Usuario")
                .update({nombre_Usuario:event.target[0].value})
                .match({nombre_Usuario:session.user.name})
            if(error){
                throw error
            }else{
                console.log("Actualizado")
                session.user.name=event.target[0].value
                formName.current.hidden=true
            }
    }
    return(
        <LayoutUser>
            
            <div className="container my-56 px-6 mx-auto">
            
            <div className="flex mb-32">
                <h1 className="text-6xl">Tu Usuario</h1>
            </div>
            <section className="mb-32 text-gray-800">
                
                <div className="flex flex-wrap">
                <div className="grow-0 shrink-0 basis-auto w-full md:w-2/12 lg:w-3/12">
                    <img src={!session ? "undefined":session.user.image} className="w-full shadow-lg rounded-lg mb-6"
                    alt="" />
                    
                </div>

                <div className="grow-0 shrink-0 basis-auto w-full md:w-10/12 lg:w-9/12 md:pl-6 text-center md:text-left">
                    <div className="flex items-center justify-start">
                        <div className="inline-flex " role="group" hidden={false}>
                            <h5 className="text-xl font-semibold">{!data.data[0].nombre_Usuario ? "undefined":data.data[0].nombre_Usuario}</h5>
                            <div className="cursor-pointer ml-6" onClick={changeName}>
                                <Image src="Util/edit.svg" height={15} width={20}></Image>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="inline-flex " role="group" >
                        <form hidden={true} ref={formName} onSubmit={fields}>
                            <div className="m-4">
                                    <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Ingrese Nuevo Nombre"
                                    required/>
                                </div>
                                <div className="text-center pt-1 mb-12 pb-1">
                                    <button
                                    className="inline-block px-6 py-2.5 bg-blue-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                    type="submit"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    >
                                    Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    <div className="flex items-center justify-start my-10">
                        <div className="inline-flex " role="group">
                        <h5 className="text-xl font-semibold">{!session ? "undefined":session.user.email}</h5>
                        
                        </div>
                    </div>
                    
                    
                    
                    <Link href={"/User/myVehicles"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Mis Vehículos
                        </button>
                    </Link>
                    <Link href={"/User/registerVehicle"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Registrar un Vehiculo
                        </button>
                    </Link>
                    <Link href={"/User/history"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Historial
                        </button>
                    </Link>
                </div>
                </div>
            </section>           
            
            </div>
            
            
        </LayoutUser>
            
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    if(!session){
        return {
            redirect:{
                destination: '/Sesion/login',
                permanent: false
            }
        }
    }
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const data=
            await supabaseAdmin
            .from("Usuario")
            .select("*")
            .eq("correo_Usuario",session.user.email)
    return{
        props:{
            session,
            data
        }
    }
}