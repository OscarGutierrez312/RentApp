import {createClient} from "@supabase/supabase-js"
import ImageKit from 'imagekit'

//import multiparty from 'multiparty'
//import middleware from 'middleware-nodejs'

import LayoutCatalogue from "../../components/layout_catalogue";


export default function RegisterVehicle({data, privKey, endPoint}){
    
    const fields = async (event) => {
        event.preventDefault();
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        
        const img = new ImageKit({
            publicKey : process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY,
            privateKey : privKey,
            urlEndpoint : endPoint  
        });

        const file = event.target[0].files[0]
        
        await img.upload({
            file: file,
            fileName: "22.png",
            folder:"pruebas"
        }, function(error, result){
            if(error)console.log(error);
            else console.log(result)
        })

        console.log(file)       
        

        /* const data = await supabaseAdmin
                .from('Usuario')
                .select('id_Usuario')
                .order('id_Usuario', {ascending:false});
        
        
        const update = {
            id_Usuario: data.data[0].id_Usuario+1,
            created_at: new Date(),
            nombre_Usuario: event.target[0].value+" "+event.target[1].value,
            correo_Usuario: event.target[2].value,
            cont_Usuario: event.target[3].value,
            rol_Usuario: "basico"
        }       
        
        let {error} = await supabaseAdmin.from('Usuario').upsert(update,{
            returning:'minimal'
        })
    
        if(error){
            throw error;
        }
        else{
            Router.push('/Sesion/login');
        } */
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
                                aria-label="Default select example"
                                defaultValue={0}
                                >
                                    <option>Tipo de Vehiculo</option>
                                    
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
                                >
                                    <option>Modelo</option>
                                    
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
                                placeholder="Precio"
                                >
                                   
                                    
                                </input>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-3 xl:w-96">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                aria-label="Default select example"
                                defaultValue={0}
                                >
                                    <option>Categoria</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                                <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
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
                        <button className="inline-block m-10 px-6 py-3 bg-green-300 
                        text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 
                        hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 
                        active:shadow-lg transition duration-150 ease-in-out" type="submit">Upload</button>
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