import Link from "next/link";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Product({product}){
    console.log(product)
    return (
        <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
          <div className="flex justify-center m-5">
            <div className="grid grid-flow-row-dense grid-cols-3 min-w-[1700px] min-h-[850px] p-10 max-h-[550px] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2">
              <div className="col-span-2">
                <img className="h-200 w-200 rounded-t-lg rounded-lg md:rounded-none md:rounded-l-lg" src={"https://ik.imagekit.io/servEasyCar"+product.imagen_Vehiculo} alt="img" />
              </div>
              <div>
                <div className="p-6  justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{product.marca.desc_Marca}</h5>
                  <p className="text-gray-700 mb-4 text-sm">
                  {product.categoria.desc_Categoria}
                  </p>
                  <Link href={"/Reserv/reserv"}>
                    <button type="button" className="inline-block px-6 py-2.5 m-10 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                      Reservar
                    </button>
                  </Link>
                  
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Solicitar</button>

                  <Link href={"/Reserv/available"}>
                    <button type="button" className="inline-block px-6 py-2.5 m-10 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                      Consultar Disponiblidad
                    </button>
                  </Link>
                  
                </div>
              </div>             
            </div>
          </div>                         
        </div>
      </LayoutCatalogue>
      );
}


export async function getServerSideProps({resolvedUrl}){

    const info=resolvedUrl.split("/");

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
    .eq('id_Vehiculo', info[2]);

    const product = data.data[0];

    return{
        props:{
            product            
        }
    }
    
}