import {getSession, useSession } from "next-auth/react"
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";


export default function MyVehicles({data}){
    console.log(data.data)
    return(
        <LayoutCatalogue>
            <section className="overflow-hidden text-gray-700 mt-32 mb-60">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {data.data.map(function(i, idx){
                            return(
                                <div className="flex flex-wrap w-1/3">
                                    <div className="w-full p-1 md:p-2">
                                    <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                                        src={"https://ik.imagekit.io/servEasyCar"+i.imagen_Vehiculo}/>
                                    </div>
                                </div>
                            )
                        })}
                    
                    </div>
                </div>
            </section>
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(context){

    const session = await getSession(context)
    
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