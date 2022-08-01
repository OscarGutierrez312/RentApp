import {getSession, useSession } from "next-auth/react"
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";


export default function MyVehicles({data}){
    console.log(data)
    return(
        <LayoutCatalogue>
            <section className="overflow-hidden text-gray-700 ">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap -m-1 md:-m-2">
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(){

    const session = await getSession()
    
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
    .eq('id_Usuario', 10005);


    return{
        props:{
            data
        }
    }
    
  }