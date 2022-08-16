import LayoutCatalogue from "../../components/layout_catalogue";
import {getSession, useSession } from "next-auth/react"
import {createClient} from "@supabase/supabase-js"
import { useRef } from "react";


export default function History({historial}){
    //console.log(historial[0].vehiculo)
    
    const hours=[]

    const ext=useRef()
    const cal=useRef()
    const can=useRef()

    const lblExt=useRef()
    const lblCalif=useRef()
    const lblCanc=useRef()
    const lblInfo=useRef()
    const lblCalVal=useRef()


    const btnCalificar=useRef()
    const btnCancelar=useRef()
    const btnExtender=useRef()

    var reservId
    var calValue

    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    for(var i=2;i<25;i++){
        hours.push(<option value={i} key={i}>{i} Horas</option>)
    }

    const cancel = async (event) => {
        
        reservId=event.target.id
        
        lblCanc.current.innerText="¿Seguro desea cancelar la reserva N° "+reservId+"?";
        lblInfo.current.innerText = ""
        ext.current.hidden=true
        cal.current.hidden=true
        can.current.hidden == true ? can.current.hidden=false:can.current.hidden=true
        
    }

    const extend = async (event) => {
        reservId=event.target.id
        lblInfo.current.innerText = ""

        const data = await supabaseAdmin
            .from("Reserva")
            .select("*")
            .eq("id_Reserva", reservId)
        if(data.data[0].estado_Reserva == "Activa"){
            lblExt.current.innerText = "Seleccione la cantidad de horas que desea extender la reserva N° "+reservId;

            ext.current.hidden==true ? ext.current.hidden=false:ext.current.hidden=true
            cal.current.hidden=true
            can.current.hidden=true
        }else{
            lblInfo.current.innerText = "Servicio Terminado No se puede modificar"
        }

        
    }

    const calif = async (event) => {
        reservId=event.target.id        
        const data1 = await supabaseAdmin
        .from('Calificacion')
        .select('id_Reserva')
        .eq("id_Reserva", reservId);
        //console.log(data1)

        if(data1.data.length == 0){
            lblCalif.current.innerText = "Califique el servicio de la reserva N° "+reservId;
            lblInfo.current.innerText = ""
            ext.current.hidden=true
            cal.current.hidden==true ? cal.current.hidden=false:cal.current.hidden=true
            can.current.hidden=true
            lblCalVal.current.innerText = "Seleccione un Valor"
        }else{
            lblInfo.current.innerText = "Servicio N°"+reservId+" Calificado"
        }
        
        
    }

    const calif0 = async (event) => {
        console.log("Calificación 1")
        calValue = 1      
        lblCalVal.current.innerText = "Valor "+calValue    
        
    }
    const calif1 = async (event) => {
        console.log("Calificación 2")
        calValue = 2
        lblCalVal.current.innerText = "Valor "+calValue
    }

    const calif2 = async (event) => {
        console.log("Calificación 3")
        calValue = 3
        lblCalVal.current.innerText = "Valor "+calValue
    }

    const calif3 = async (event) => {
        console.log("Calificación 4")
        calValue = 4
        lblCalVal.current.innerText = "Valor "+calValue
    }

    const calif4 = async (event) => {
        console.log("Calificación 5")
        calValue = 5
        lblCalVal.current.innerText = "Valor "+calValue
    }


    const fields = async (event) =>{
        event.preventDefault();
        //console.log(event.target)
        if(event.target.id == "Calif"){
            const data = await supabaseAdmin
                .from('Calificacion')
                .select('id_Calificacion')
                .order('id_Calificacion', {ascending:false});
            
             const update = {
                id_Calificacion:data.data[0].id_Calificacion+1,
                created_at:new Date(),
                obs_Calificacion:event.target[0].value,
                valor_Calificacion:calValue,
                id_Reserva:reservId
            }
            let {error} = await supabaseAdmin.from('Calificacion').upsert(update,{
                returning:'minimal'
            })
        
            if(error){
                throw error;
            }
            else{
                lblInfo.current.innerText = "Servicio Calificado"
                cal.current.hidden=true
            } 
        }
        if(event.target.id == "Extend"){
            const data = await supabaseAdmin
            .from("Reserva")
            .select("*")
            .eq("id_Reserva", reservId)
            if(data.data[0].estado_Reserva == "Activa"){
                const inicio=new Date(data.data[0].fecha_inicio_Reserva)
                const fin=new Date(data.data[0].fecha_fin_Reserva)
                console.log(fin)
                fin.setHours(fin.getHours()+(parseInt(event.target[0].value)))
                fin.setHours(fin.getHours()-5)
                console.log(data.data)
                console.log(inicio)
                console.log(fin)
                console.log(event.target[0].value)

                
                const {upt, error} = await supabaseAdmin
                .from("Reserva")
                .update({fecha_fin_Reserva:fin})
                .match({id_Reserva:reservId})
                if(error){
                    throw error
                }else{
                    console.log("Actualizado")
                    lblInfo.current.innerText = "Servicio Actualizado"
                    ext.current.hidden=true
                }
            }
        }
        if(event.target.id == "Cancel"){
            const {upt, error} = await supabaseAdmin
                .from("Reserva")
                .update({estado_Reserva:"Cancelada"})
                .match({id_Reserva:reservId})
            if(error){
                throw error
            }else{
                console.log("Actualizado")
                lblInfo.current.innerText = "Servicio Actualizado"
                can.current.hidden=true
            }
        }
        
    }

    return(
        <LayoutCatalogue>
            <div className="flex items-center justify-start">
                <div className="inline-flex" role="group">
                    <div className="flex-col px-24">
                        <h3 className="text-2xl text-gray-700 font-bold mb-6 ml-6">Historial</h3>

                        <ol className="border-l-2 border-purple-600 ml-10 mt-32 mb-52">
                            {historial.map(function(i, idx){
                                return(
                                    <li key={idx}>
                                        <div className="md:flex flex-start">
                                        <div className="bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                            </svg>
                                        </div>
                                        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
                                            <div className="flex justify-between mb-4">
                                            <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{historial[idx].vehiculo.marca.desc_Marca} {historial[idx].vehiculo.modelo.desc_Modelo}</a>
                                            <a href="#!" className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">N° {i.id_Reserva}</a>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                            
                                            <a href="#!" className="ml-8 font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{i.fecha_inicio_Reserva.split("T")[0]+" "+i.fecha_inicio_Reserva.split("T")[1]}</a>
                                            <a href="#!" className="ml-8 font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">{i.fecha_fin_Reserva.split("T")[0]+" "+i.fecha_fin_Reserva.split("T")[1]}</a>
                                            </div> 
                                            <div className="flex items-center justify-start">
                                                <div className="inline-flex" role="group">
                                                    <p className=" mb-6 mr-14 text-blue-400">{historial[idx].vehiculo.categoria.desc_Categoria}</p>
                                                    {i.estado_Reserva == "Activa" ? 
                                                        <p className="text-green-300 mb-6">{i.estado_Reserva}</p>    
                                                    :
                                                        <p className="text-red-600 mb-6">{i.estado_Reserva}</p>
                                                    }
                                                    
                                                </div>
                                            </div>
                                            
                                                
                                            
                                            <div className="flex items-center justify-center">
                                                <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                                                    {i.estado_Reserva == "Terminada" || "Cancelada" ?
                                                    <></>
                                                    :
                                                    <button type="button" ref={btnCancelar} id={i.id_Reserva} onClick={cancel} className="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                                        Cancelar
                                                    </button>
                                                    }
                                                    {i.estado_Reserva == "Terminada" || "Cancelada"?
                                                    <></>
                                                    :
                                                    <button type="button" ref={btnExtender} id={i.id_Reserva} onClick={extend} className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                                        Extender
                                                    </button>
                                                    }
                                                    
                                                    <button type="button" ref={btnCalificar} id={i.id_Reserva} onClick={calif} className=" rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                                        Calificar
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </li>
                                )
                            })}

                        </ol>
                    </div>
                    <div className="flex-col ml-56 px-10 my-40 fixed">
                    <label className="text-2xl ml-96" ref={lblInfo}> </label>
                        <form onSubmit={fields} id="Extend" hidden={true} ref={ext}>
                            <div className="grid grid-cols-2 gap-4 ml-96">
                                <div className="flex justify-center">
                                    <div className="mb-3 xl:w-96">
                                        <label className="text-2xl" ref={lblExt}>Reserva N° </label>
                                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                        aria-label="Default select example"
                                        defaultValue={0}
                                        >
                                            <option>Seleccione</option>
                                            <option value={1}>1 Hora</option>
                                            {hours.map(function(i){
                                                return(i)
                                            })}
                                                
                                            
                                            
                                        </select>

                                        <button type="submit" className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-400 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                                            Enviar
                                        </button>
                                    </div>
                                    
                                </div>
                                
                            </div> 
                        </form>
                        <form onSubmit={fields} id="Cancel" hidden={true} ref={can}>
                            <div className="flex ml-96">
                                <h1 className="text-3xl text-red-600 mr-10" ref={lblCanc}>
                                    ¿Seguro desea Cancelar?
                                </h1>
                                <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                                    Cancelar
                                </button>
                            </div>
                            
                        </form>
                        <form onSubmit={fields} id="Calif" hidden={true} ref={cal}>
                            <div className="ml-96">
                            <label className="text-2xl" ref={lblCalif}>Reserva N° </label>
                            <ul className="flex justify-center">
                                <li onClick={calif0} className="cursor-pointer hover:scale-110">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angry" className="w-5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor"  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z"></path>
                                    </svg>
                                </li>
                                <li onClick={calif1} className="cursor-pointer hover:scale-110">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="frown" className="w-5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"></path>
                                    </svg>
                                </li>
                                <li onClick={calif2} className="cursor-pointer hover:scale-110">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="meh" className="w-5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z"></path>
                                    </svg>
                                </li>
                                <li onClick={calif3} className="cursor-pointer hover:scale-110">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile" className="w-5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
                                    </svg>
                                </li>
                                <li onClick={calif4} className="cursor-pointer hover:scale-110">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="grin-stars" className="w-5 text-blue-500 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"></path>
                                    </svg>
                                </li>
                                </ul>
                            <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                                <label ref={lblCalVal} htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
                                >Seleccione un Valor</label>
                                <textarea
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                    border border-solid border-gray-300 rounded transition ease-in-out m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Observaciones"
                                ></textarea>
                                <button type="submit" className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-400 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                                    Enviar
                            </button>
                            </div>
                            
                            </div>    
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            
        </LayoutCatalogue>
            
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
        .order("id_Reserva", {ascending:true})

        //console.log(hist)

        const historial = hist.data

        return{
            props:{
                historial
            }
        }
    }
}