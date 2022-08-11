import Link from "next/link";
import Image from "next/image";
import ImageKit from "imagekit";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";
import { useRef } from "react";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

export default function Catalogue({data, catalogueId, reservas, days, session}){
    //console.log(data.data[2].reserva.length)
  const opt = []
  const optCat = []  
  session = useSession();


  const cat1 = useRef()
  days.map(function(i, idx){
    opt.push(<option key={idx} value={i[0]+"-"+i[2]}>{i[1]}</option>);
  })
  
  const setCat = async (event) =>{
    const val = event.target.value
    const val1 = val.split("-")
    const catOpt=[]
      if(val1[1] == 1){
          catOpt=[["6001","Familiar"], ["6002","Todoterreno"], ["6003","Deportivo"]]
      }
      if(val1[1] == 2 || val1[1] == 3){
          catOpt=[["6004","Ciudad"], ["6005","Deportiva"],["6006","Montaña"], ["6007","Profesional"]]
      }
      

      cat1.current.options[0] = new Option("Categoria", 0)
      catOpt.map(function(i, idx){
          cat1.current.options[idx+1] = new Option(i[1], i[0])
      })
  }
  const fields = async (event) => {
    event.preventDefault()
    Router.push("/Filter/"+event.target[0].value.split("-")[0]+"-"+event.target[1].value+"-"+event.target[2].value+"-"+event.target[3].value+"-"+catalogueId)
  }

  const deleteVehicle = async (event) =>{
    const supabaseAdmin = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const {result, error} = await supabaseAdmin
    .from("Vehiculo")
    .delete()
    .match({"id_Vehiculo": event.target.id})

    if(error){
      throw error
    }else{
      alert("vehiculo Eliminado")
      Router.push("/")
    }
    
  }
    
    return (
      <LayoutCatalogue>
        

        <div className="flex flex-col justify-center my-10 bg-blend-color">     
        <h1 className="px-40 pt-10 text-4xl text-yellow-700 hover:scale-105 transition duration-150 ease-in-out">Busca un Vehículo por tu Marca Favorita,
         Elige la Categoria que más se ajuste a lo que necesitas ó Selecciona un Rango de Precio</h1>    
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-2xl ml-[30%] mt-28 mb-28">
          
          <form onSubmit={fields}>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-full">
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        aria-label="Default select example"
                        defaultValue={0}
                        onChange={setCat}
                        >                 
                        <option value={0}>Marca</option>         
                        {opt.map(function(i){
                          return(i)
                        })}
                        </select>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        aria-label="Default select example"
                        defaultValue={0}
                        ref={cat1}
                        >                 
                        <option value={0}>Categoria</option>         
                        {optCat.map(function(i){
                          return(i)
                        })}
                        </select>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <div className="ml-10 xl:w-96">
                        <select className="form-select appearance-none block w-48 mx-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        aria-label="Default select example"
                        defaultValue={0}
                        >       
                        <option value={0}>Rango de Precio</option>          
                        <option value={1}>Menor a</option>   
                        <option value={2}>Mayor a</option>       
                        
                        </select>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <div className="ml-10 xl:w-80">
                        <input className="form-input appearance-none block w-24 mx-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        aria-label="Default select example"
                        placeholder="Precio"
                        type="number"
                        min={0}
                        defaultValue={0}
                        ></input>
                    </div>
                    
                </div>
              
              </div>                                                 
              <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out">Buscar</button>
              
                      
          </form>
        </div>     

          {data.data.map(function(i, idx){
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
                      {data.data[idx].reserva.length == 0 ? <h5 className="text-xl font-medium mb-2 text-green-700">Disponible </h5>:
                      <h5 className="text-xl font-medium mb-2 text-red-300">Reservado </h5>}
                      {!session.data ? "":session.data.user.name == "Administrador" ? 
                      <img id={i.id_Vehiculo} className="max-w-30 max-h-14 hover:scale-95 transition ease-in-out" onClick={deleteVehicle} src="/images/delete.png" ></img>
                      :
                      <></>
                      }
                      
                    </div>
                  </div>
                </div>
              </Link>               
            )
          })}                       
        </div>
      </LayoutCatalogue>
    );
  }


export async function getServerSideProps(context){
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const session = await getSession(context)


    const catalogueId=context.params.catalogueId.replace(/\-/g, '+');

    const tipoVehiculo = await supabaseAdmin
    .from("Tipo_Vehiculo")
    .select('*')
    .eq('desc_Tipo', catalogueId);

    const type = tipoVehiculo.data[0].id_Tipo;

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
    .eq('id_Tipo_Vehiculo', type);

    const reservas = await supabaseAdmin
    .from("Reserva")
    .select("estado_Reserva, id_Vehiculo")
    .order("id_Vehiculo");

    //console.log(data.data)

    const days = []

    const marcas = await supabaseAdmin
    .from("Marca")
    .select('*')
    .order("desc_Marca");
    
    const marc = marcas.data

    marc.map(function(i, idx){
      days.push([i.id_Marca, i.desc_Marca, i.id_Tipo_Vehiculo]);
    })



    return{
        props:{
            data,
            catalogueId,
            reservas, 
            days, 
            session
        }
    }
    
  }
  