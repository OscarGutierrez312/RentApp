import LayoutCatalogue from "../../components/layout_catalogue";
import {getSession, useSession } from "next-auth/react"
import {createClient} from "@supabase/supabase-js"


export default function History({historial}){
    console.log(historial[0].vehiculo)
    return(
        <LayoutCatalogue>
            <h3 className="text-2xl text-gray-700 font-bold mb-6 -ml-3">Latest News</h3>

                <ol className="border-l-2 border-purple-600 ml-10 mt-32 mb-52">
                    {historial.map(function(i, idx){
                        return(
                            <li>
                                <div className="md:flex flex-start">
                                <div className="bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                    </svg>
                                </div>
                                <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
                                    <div className="flex justify-between mb-4">
                                    <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{historial[idx].vehiculo.marca.desc_Marca} {historial[idx].vehiculo.modelo.desc_Modelo}</a>
                                    <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"></a>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                    
                                    <a href="#!" className="ml-8 font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{i.fecha_inicio_Reserva.split("T")[0]+" "+i.fecha_inicio_Reserva.split("T")[1]}</a>
                                    <a href="#!" className="ml-8 font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{i.fecha_fin_Reserva.split("T")[0]+" "+i.fecha_fin_Reserva.split("T")[1]}</a>
                                    </div>
                                    <p className="text-gray-700 mb-6">{historial[idx].vehiculo.categoria.desc_Categoria}</p>
                                    <p className="text-gray-700 mb-6">{i.estado_Reserva}</p>
                                </div>
                                </div>
                            </li>
                        )
                    })}
                
                </ol>
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(context){
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

    const session = await getSession(context)

    const user = await supabaseAdmin
    .from("Usuario")
    .select("id_Usuario")
    .eq("correo_Usuario",session.user.email)

    const hist = await supabaseAdmin
    .from("Reserva")
    .select(`
    *,
    vehiculo: Vehiculo(
        modelo: Modelo(desc_Modelo),
        marca: Marca(desc_Marca), 
        categoria: Categoria(desc_Categoria)
    )
  `)
    .eq("id_Usuario", user.data[0].id_Usuario)

    //console.log(hist)

    const historial = hist.data

    return{
        props:{
            historial
        }
    }

}