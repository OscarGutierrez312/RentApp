import Layout from "../../components/layout";
import { useRef } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import {createClient} from "@supabase/supabase-js"
import Router from "next/router";
export default function SignUp({session, lastUrl}){
    //const session1 = useSession()
    
    
    const fields = async (event) => {
        event.preventDefault();
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        const data = await supabaseAdmin
                .from('Usuario')
                .select('id_Usuario')
                .order('id_Usuario', {ascending:false});
        
        
        const update = {
            id_Usuario: data.data[0].id_Usuario+1,
            created_at: new Date(),
            nombre_Usuario: event.target[0].value+" "+event.target[1].value,
            correo_Usuario: event.target[2].value,
            cont_Usuario: event.target[3].value,
            rol_Usuario: "basico"
        }       
        
        let {error} = await supabaseAdmin.from('Usuario').upsert(update,{
            returning:'minimal'
        })
    
        if(error){
            throw error;
        }
        else{
            Router.push('/Sesion/login');
        }
    }  

     
    return (
        <Layout>
            <div>
                <section className="h-full gradient-form bg-gray-200 md:h-screen">
                    <div className="container px-6 h-full">
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <div className="xl:w-10/12 ">
                                <div className="block bg-white shadow-lg rounded-lg">
                                    <div className="lg:flex lg:flex-wrap g-0">
                                        <div className="lg:w-6/12 px-4 md:px-0 p-16">
                                            <div className="md:p-12 md:mx-6">
                                                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                                                    <form onSubmit={fields}>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="form-group mb-6">
                                                                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                                                                border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                                id="exampleInput123" aria-describedby="emailHelp123" placeholder="Nombres" autoComplete="off"/>
                                                            </div>
                                                            <div className="form-group mb-6">
                                                                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                                border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                                id="exampleInput124" aria-describedby="emailHelp124" placeholder="Apellidos" autoComplete="off"/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group mb-6">
                                                            <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                                                            border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                            id="exampleInput125" placeholder="Ingrese una Correo Electrónico" autoComplete="off"/>
                                                        </div>
                                                        <div className="form-group mb-6">
                                                            <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                                            border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                            id="exampleInput126" placeholder="Ingrese una Contraseña"/>
                                                        </div>
                                                        <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                                            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                                                            transition duration-150 ease-in-out">Sign up</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none back_gradient">
                                            <style jsx>{' .back_gradient {background: linear-gradient(to right, #3bc4fa, #73aafd, #5f1ef8, #7a09fa);}'}</style>
                                            <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                                <h4 className="text-xl font-semibold mb-6">Registrate y Registra tu Vehículo</h4>
                                                <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                consequat.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );    
}
export async function getServerSideProps(context){
    const session = await getSession(context);
    const lastUrl = context.req.headers.referer || null
    
    return{
        props:{
            session,
            lastUrl
        },
    }
}