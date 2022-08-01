import { getSession } from "next-auth/react";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";


export default function Reserv({product}){

    console.log(product)

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

    return(
        <LayoutCatalogue>
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
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding bg-no-repeat
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                    <option selected>Fecha</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding bg-no-repeat
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                    <option selected>Hora</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        </div>                                                    
                                                        

                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding bg-no-repeat
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                    <option selected>Tiempo</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding bg-no-repeat
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                    <option selected>Metodo de Pago</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                                            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                                                            transition duration-150 ease-in-out">Reservar</button>
                                                        <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

                                                               
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
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    //console.log(context.params.reserv)
    const idVehiculo = context.params.reserv
    if(!session){
        return {
            redirect:{
                destination: '/Sesion/login',
                permanent: false
            }
        }
    }else{
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          );
      
          const data = await supabaseAdmin
          .from("Vehiculo")
          .select(`
            *,
            modelo: Modelo(desc_Modelo),
            marca: Marca(desc_Marca), 
            usuario: Usuario(nombre_Usuario, correo_Usuario),
            categoria: Categoria(desc_Categoria),
            tipo:Tipo_Vehiculo(desc_Tipo)
          `)
          .eq('id_Vehiculo', idVehiculo);
      
          const product = data.data[0];
        return {
            props:{
                product
            }
        }
    }
    
    
}
