import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {createClient} from "@supabase/supabase-js"
import { getSession, useSession } from "next-auth/react";
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Product({product, validate}){
    console.log(validate)
    const formName = useRef()
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const changeName = async (event) =>{
        formName.current.hidden == true ? formName.current.hidden = false:formName.current.hidden = true
    }
    const fields = async (event) => {
      event.preventDefault();
      const {upt, error} = await supabaseAdmin
              .from("Vehiculo")
              .update({desc_Vehiculo:event.target[0].value})
              .match({id_Vehiculo:product.id_Vehiculo})
          if(error){
              throw error
          }else{
              console.log("Actualizado")
              
              formName.current.hidden=true
          }
  }
    return (
        <LayoutCatalogue>
        <div className="flex flex-col justify-center mt-20 bg-blend-color">          
          <div className="flex justify-center m-5">
            <div className="grid grid-flow-row-dense grid-cols-3 min-w-[1600px] min-h-[750px] p-10 max-h-[550px] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2">
              <div className=" flex col-span-2 items-center">
                <Image className="rounded-lg object-fill" src={product.imagen_Vehiculo} width={"900px"} height={"500px"} alt="img" />
              </div>
              <div>
                <div className="p-6  justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{product.marca.desc_Marca+" "+product.modelo.desc_Modelo}</h5>
                  <p className="text-gray-700 mb-4 text-sm">
                  {product.categoria.desc_Categoria}
                  </p>
                  {product.reserva.length == 0 ? 
                  <Link href={"/Reserv/"+product.id_Vehiculo}>
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Reservar
                  </button>
                  </Link>:
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                  disabled>
                  Reservado
                  </button>}
                  <p className="text-xl">{product.desc_Vehiculo}</p>
                  {validate ? 
                  <div className="cursor-pointer ml-6" onClick={changeName}>
                    <Image src="Util/edit.svg" height={15} width={20}></Image>
                  </div>
                  :<></>}
                  <div className="inline-flex " role="group" >
                        <form hidden={true} ref={formName} onSubmit={fields}>
                            <div className="m-4">
                                    <textarea
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Ingrese Nueva Descripcion"
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
                  
                  {/* <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Solicitar</button>

                  <Link href={"/Reserv/available"}>
                    <button type="button" className="inline-block px-6 py-2.5 m-10 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                      Consultar Disponiblidad
                    </button>
                  </Link> */}
                  
                </div>
              </div>             
            </div>
          </div>                         
        </div>
      </LayoutCatalogue>
      );
}


export async function getServerSideProps(context){

    const session = await getSession(context)


    const info=context.resolvedUrl.split("/");

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
      tipo:Tipo_Vehiculo(desc_Tipo),
      reserva: Reserva("estado_Reserva").eq("id_Vehiculo", id_Vehiculo)
    `)
    .eq('id_Vehiculo', info[2]);
    var validate
    if(session){
      const val = await supabaseAdmin
      .from("Usuario")
      .select("id_Usuario")
      .eq("correo_Usuario", session.user.email);
      console.log(val.data)
      validate = val.data[0].id_Usuario == data.data[0].id_Usuario ? true:false
    }  

    console.log(validate)

    
    const product = data.data[0];

    return{
        props:{
            product,
            validate            
        }
    }
    
}