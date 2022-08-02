import {createClient} from "@supabase/supabase-js"
import { getSession, useSession } from "next-auth/react";
import Router  from "next/router";
import LayoutCatalogue from "../../components/layout_catalogue";


export default function Availables({reser}){
    const fields = async (event) => {
        
        event.preventDefault();
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

       
        const data = await supabaseAdmin
                .from('Pago')
                .select('id_Pago')
                .order('id_Pago', {ascending:false});
        
        const dataR = await supabaseAdmin
        .from('Reserva')
        .select('*')
        .order('id_Reserva', {ascending:false});
    
        //console.log(dataR.data[0])
    
        const reser = dataR.data[0]

        const update = {
            id_Pago: (data.data[0].id_Pago)+1,
            created_at: new Date(),
            subTotal_Pago: reser.valor_Reserva,
            desc_Pago: 0,
            total_Pago: reser.valor_Reserva,
            id_Reserva: reser.id_Reserva,
            
        }       
        

        let {error} = await supabaseAdmin.from('Pago').upsert(update,{
            returning:'minimal'
        })
    
        if(error){
            throw error;
        }
        else{
            alert("Pago Exitoso")
            Router.push('/')
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
                                                                <input
                                                                    type="text"
                                                                    name="user"
                                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                                    id="exampleFormControlInput1"
                                                                    placeholder="Número de Tarjeta"
                                                                    autoComplete="off"
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <input
                                                                    type="text"
                                                                    name="user"
                                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                                    id="exampleFormControlInput1"
                                                                    placeholder="Código de Verificación"
                                                                    autoComplete="off"
                                                                    />
                                                            </div>
                                                        </div>
                                                        </div>                                                    
                                                        
                                                        <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <input
                                                                    type="text"
                                                                    name="user"
                                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                                    id="exampleFormControlInput1"
                                                                    placeholder="Nombre Completo"
                                                                    autoComplete="off"
                                                                    />
                                                            </div>
                                                        </div>
                                                        
                                                        </div>  
                                                        

                                                        

                                                        <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                                            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                                                            transition duration-150 ease-in-out">Pagar</button>
                                                        
                                                               
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none back_gradient">
                                            <style jsx>{' .back_gradient {background: linear-gradient(to right, #555555, #bdbdbd, #e7e7e7, #ffffff);}'}</style>
                                            <div className="w-full text-white px-4 py-6 md:p-1 md:mx-6">
                                                <h4 className="text-xl font-semibold mb-6"></h4>
                                                <div className="flex justify-center m-1 h-72 w-full">
                                                    {/* <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ">
                                                        <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={product.imagen_Vehiculo} alt="img" width={150} height={50} />
                                                        <div className="p-6 flex flex-col justify-start">
                                                        <h5 className="text-gray-900 text-xl font-medium mb-2">{product.marca.desc_Marca+" "+product.modelo.desc_Modelo} </h5>
                                                        <p className="text-gray-700 text-base mb-4">
                                                            {product.categoria.desc_Categoria}
                                                        </p>
                                                        </div>
                                                        
                                                    </div> */}
                                                    </div>
                                                {/* <label ref={time}></label>
                                                <label ref={cost}></label> */}
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
    if(!session){
        return {
            redirect:{
                destination: '/Sesion/login',
                permanent: false
            }
        }
    }
    return {
        props:{
            session
        }

    }
}
