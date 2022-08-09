import Link from "next/link";
import Image from "next/image";
import ImageKit from "imagekit";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";


export default function Catalogue({filt}){
    return(
        <LayoutCatalogue>
        

        <div className="flex flex-col justify-center my-10 bg-blend-color">          
          {filt.data.map(function(i, idx){
            return (      
              <Link key={idx} href={"/Product/"+i.id_Vehiculo}>
                <div key={idx} className="flex justify-center m-10 cursor-pointer">
                  <div className="flex flex-col min-w-full relative md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2 ring-blue-500 hover:scale-95 transition duration-150 ease-in-out">
                    <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={i.imagen_Vehiculo} alt="img" width={150} height={50} />
                    <div className="p-6 flex flex-col justify-start">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">{i.marca.desc_Marca+" "+i.modelo.desc_Modelo} </h5>
                      <p className="text-gray-700 text-base mb-4">
                        {i.categoria.desc_Categoria}
                      </p>
                      <p className="text-gray-600 text-xs">Precio: ${i.precio_Vehiculo}/Hora </p>
                    </div>
                    <div className="p-6 flex flex-col absolute inset-y-0 right-0">
                      {filt.data[idx].reserva.length == 0 ? <h5 className="text-xl font-medium mb-2 text-green-700">Disponible </h5>:
                      <h5 className="text-xl font-medium mb-2 text-red-300">Reservado </h5>}
                      
                    </div>
                  </div>
                </div>
              </Link>               
            )
          })}                       
        </div>
      </LayoutCatalogue>
    )
}

export async function getServerSideProps({resolvedUrl}){
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const params = resolvedUrl.split("/")

    const filt = await supabaseAdmin
      .from("Vehiculo")
      .select(`
      *,
      modelo: Modelo(desc_Modelo),
      marca: Marca(desc_Marca), 
      usuario: Usuario(nombre_Usuario, correo_Usuario),
      categoria: Categoria(desc_Categoria),
      tipo:Tipo_Vehiculo(desc_Tipo),
      reserva: Reserva("estado_Reserva").eq("id_Vehiculo", id_Vehiculo)
    `)
      .filter("id_marca_Vehiculo", "in", "("+params[2]+")")
      console.log(filt)
      console.log(params)
    return{
        props:{
            filt
        }
    }
}
