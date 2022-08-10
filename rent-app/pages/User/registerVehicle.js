import { useSession } from "next-auth/react";
import {createClient} from "@supabase/supabase-js"
import { useRef } from "react";
import ImageKit from 'imagekit'


import LayoutCatalogue from "../../components/layout_catalogue";


export default function RegisterVehicle({data, privKey, endPoint}){

    const {data:session} = useSession()

    const marc1 = useRef(null)
    const cat1 = useRef(null)
    const load = useRef(null)
    const msg = useRef(null)

    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const setMarca = async (event) =>{

        const marc = await supabaseAdmin
        .from("Marca")
        .select('*')
        .eq("id_Tipo_Vehiculo", event.target.value)

        for(var i =0;i<marc1.current.options.length;i++){
            marc1.current.options[i] = undefined
        }
        
        marc1.current.options[0] = new Option("Seleccione Marca", 0)
        marc.data.map(function(i, idx){
            marc1.current.options[idx+1] = new Option(marc.data[idx].desc_Marca, marc.data[idx].id_Marca)
        })

        for(var i =0;i<cat1.current.options.length;i++){
            cat1.current.options[i] = undefined
        }
        
        const catOpt=[]
        if(event.target.value == 1){
            catOpt=[["6001","Familiar"], ["6002","Todoterreno"], ["6003","Deportivo"]]
        }
        if(event.target.value == 2 || event.target.value == 3){
            catOpt=[["6004","Ciudad"], ["6005","Deportiva"],["6006","Montaña"], ["6007","Profesional"]]
        }
        

        cat1.current.options[0] = new Option("Seleccione Categoria", 0)
        catOpt.map(function(i, idx){
            cat1.current.options[idx+1] = new Option(i[1], i[0])
        })


    }

    
    const fields = async (event) => {
        event.preventDefault();
        
        
        const img = new ImageKit({
            publicKey : process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY,
            privateKey : privKey,
            urlEndpoint : endPoint  
        });

        const file = event.target[6].files[0]
        const tp=event.target["Tipo"].value
        await img.upload({
            file: file,
            fileName: event.target["Marca"].value,
            folder:tp == 1 ? "Vehicles": tp == 2 ? "Motorbikes":"Bycicles"
        },async function(error, result){
            if(error)console.log(error);
            else{
                
                load.current.hidden=true

                const data = await supabaseAdmin
                .from('Vehiculo')
                .select('id_Vehiculo')
                .order('id_Vehiculo', {ascending:false});

                const user = await supabaseAdmin
                .from("Usuario")
                .select("id_Usuario")
                .eq("correo_Usuario",session.user.email)
        

                const update = {
                    id_Vehiculo: data.data[0].id_Vehiculo+1,
                    created_at: new Date(),
                    id_modelo_Vehiculo:event.target["Modelo"].value,
                    id_marca_Vehiculo:event.target["Marca"].value,
                    precio_Vehiculo:event.target["Precio"].value,
                    id_Usuario:user.data[0].id_Usuario,
                    id_Categoria:event.target["Categoria"].value,
                    Calificacion:0,
                    id_Tipo_Vehiculo:event.target["Tipo"].value,
                    imagen_Vehiculo:result.filePath
                }       
                
                let {error} = await supabaseAdmin.from('Vehiculo').upsert(update,{
                    returning:'minimal'
                })
            
                if(error){
                    throw error;
                }
                else{
                    msg.current.hidden=false
                }
                
            } 
        })
        
        load.current.hidden=false
        msg.current.hidden=true


        

        
    } 

    return(
        <LayoutCatalogue>
            <div className="flex justify-center pt-36 relative ">
                <div>
                    <form onSubmit={fields} encType="multiparty/form-data">
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                id="Tipo"
                                aria-label="Default select example"
                                defaultValue={0}
                                onChange={setMarca}
                                >
                                    <option>Tipo de Vehiculo</option>
                                    <option value={1}>Vehículo</option>
                                    <option value={2}>Motocicleta</option>
                                    <option value={3}>Bicicleta</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                aria-label="Default select example"
                                id="Marca"
                                defaultValue={0}
                                ref={marc1}
                                >
                                    <option>Marca</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                aria-label="Default select example"
                                defaultValue={0}
                                id="Modelo"
                                
                                >
                                    <option>Seleccione Modelo</option>
                                    <option value={4006}>2018</option>
                                    <option value={4007}>2019</option>
                                    <option value={4008}>2020</option>
                                    <option value={4009}>2021</option>
                                    <option value={4010}>2022</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                aria-label="Default select example"
                                defaultValue={0}
                                id="Categoria"
                                ref={cat1}
                                >
                                    <option>Categoria</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <input className="input appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                id="Precio"
                                placeholder="Precio"
                                >
                                   
                                    
                                </input>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
                                >Descripción del Vehículo</label>
                                <textarea
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                    border border-solid border-gray-300 rounded transition ease-in-out m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Descripción"
                                ></textarea>
                            </div>
                        </div>
                        <input className="form-control block font-thin bg-slate-100 
                        rounded text-blue-900 border border-solid border-cyan-200" name="logo" type="file" />
                        <div className="flex">
                            <button className=" inline-block m-10 px-6 py-3 bg-green-300 
                            text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 
                            hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 
                            active:shadow-lg transition duration-150 ease-in-out" type="submit">Upload</button>
                            <div hidden={true} className="
                                spinner-border
                                animate-spin
                                w-8
                                h-8
                                border-4
                                rounded-full
                                text-green-500
                                mt-11
                                
                            " role="status" ref={load} >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <h3 className="text-3xl ml-10 text-green-700" ref={msg} hidden={true}>Registro Exitoso</h3>
                        
                    </form>
                    
                </div>

            
            </div>
            

        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(){
    

    const privKey = process.env.IMAGE_KIT_PRIVATE_KEY
    const endPoint = process.env.IMAGE_KIT_URL_ENDPOINT

    const data = {}

    
    return {
        props:{
            data,
            privKey,
            endPoint
        }
    }
}