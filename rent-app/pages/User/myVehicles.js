import {getSession, useSession } from "next-auth/react"
import {createClient} from "@supabase/supabase-js"
import LayoutVehicles from "../../components/layout_vehicles";
import Link from "next/link";

export default function MyVehicles({data}){
    console.log(data.data)
    return(
        <LayoutVehicles>
            <section className="overflow-hidden text-gray-700 mt-80 mb-96">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap mb-96 md:-m-2">
                        {data.data.length == 0 ? 
                        <h1 className="text-7xl ">No tienes Vehículos Registrados</h1>
                        :
                        data.data.map(function(i, idx){
                            return(
                                <Link href={"/Product/"+i.id_Vehiculo}>
                                <div className="flex flex-wrap w-1/3 cursor-pointer" key={idx}>
                                    <div className="w-full p-1 md:p-2">
                                    <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg hover:scale-105 transition ease-in-out"
                                        src={"https://ik.imagekit.io/servEasyCar"+i.imagen_Vehiculo}/>
                                    </div>
                                </div>
                                </Link>
                            )                               
                                
                        })
                        }
                        
                    
                    </div>
                </div>
            </section>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tipo de Vehiculo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Marca
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Modelo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Categoria
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Calificación
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.data.map(function(i, idx){
                            return(
                                <tr className="border-b" key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {idx+1}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.tipo.desc_Tipo == "Vehicle" ? "Vehiculo": i.tipo.desc_Tipo == "Motorbike" ? "Motocicleta":"Bicibleta"}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.marca.desc_Marca}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.modelo.desc_Modelo}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.categoria.desc_Categoria}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.precio_Vehiculo}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {i.Calificacion}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    Cell
                                </td>
                                
                            </tr>
                            )                               
                                
                        })
                        }
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
        </LayoutVehicles>
            
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
    }else{

        
        
        const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const user = await supabaseAdmin
        .from("Usuario")
        .select("id_Usuario")
        .eq("correo_Usuario",session.user.email)

        //console.log(user.data[0].id_Usuario)

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
        .eq('id_Usuario', user.data[0].id_Usuario);
        

        return{
            props:{
                data
            }
        }
    }
  }