import { useSession, getSession } from "next-auth/react";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";
import { useRef } from "react";
import Image from "next/image";
import Router from "next/router";


export default function Reserv({product, lastUrl}){

    //console.log(product)

    const {data:session} = useSession()

    const days = []

    const initDate = useRef(null)
    const initHour = useRef(null)
    const endDate = useRef(null)
    const endHour = useRef(null)
    const time = useRef(null)
    const cost = useRef(null)

    const actDay = new Date().getDate()

    const m = new Intl.DateTimeFormat('ES-LA', {month: 'long'}).format(new Date())

    const month = m.charAt(0).toUpperCase()+m.slice(1)
    
    for (var i=0;i<5;i++){
        days.push(<option key={i} value={i+actDay}>{month} {i+actDay}</option>);
    }

    const changeInitHour = async (event)=> {

        var len = initHour.current.options.length
        
        //console.log(initHour.current.options)

        const actHour = event.target.value == new Date().getDate() ? new Date().getHours() : 0;
        //console.log(actHour)
        for (var i=actHour+1;i<24;i++){
            initHour.current.options[i-actHour] = new Option(i+':00', i)
        }
    }

    const changeEndDate = async (event)=> {

        const hourP = parseInt(event.target.value)+1
        const dayP = parseInt(initDate.current.value)-1
        
        const nDate = new Date(new Date().getFullYear(), 7, dayP, (hourP));
        
        const auxDate = new Date()
            
        auxDate.setDate(nDate.getDate()+1)
        for (var i=1;i<10;i++){                   
            const aux1Date = auxDate  
            const mo = new Intl.DateTimeFormat('ES-LA', {month: 'long'}).format(auxDate)
            const mon = mo.charAt(0).toUpperCase()+m.slice(1)
            endDate.current.options[i] = new Option(mon+" "+auxDate.getDate(), auxDate.getDate())
            auxDate.setDate(aux1Date.getDate()+1)
        }
    }

    const changeEndHour = async (event)=> {
        

        const hourP = parseInt(initHour.current.value)+1
        const dayP = parseInt(initDate.current.value)
        
        const nDate = new Date(new Date().getFullYear(), 7, dayP, (hourP));

        const actHour = nDate.getDate() == event.target.value ? nDate.getHours() : 0;
        
        for (var i=actHour;i<24;i++){
            endHour.current.options[(i+1)-actHour] = new Option(i+':00', i)
        }
    }

    const setTime = async (event)=> {
        const a = new Date(new Date().getFullYear(),7,initDate.current.value,initHour.current.value)
        const b = new Date(new Date().getFullYear(),7,endDate.current.value,endHour.current.value)


        const diffTime = Math.abs(b - a);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
        const diffDays = parseInt(diffHours / 24); 
        const Hours = diffHours-(diffDays*24)

        const days = diffDays == 0 ? "": diffDays > 1 ? diffDays+" Días": diffDays+" Día"
        const hours = Hours == 0 ? "": Hours > 1 ? " "+Hours+" Horas": " "+Hours+" Hora"
        time.current.innerText = "Tiempo de Renta: "+days+hours+"\n"

        const options2 = { style: 'currency', currency: 'COP' };
        const numberFormat2 = new Intl.NumberFormat('Es-LA', options2);

        cost.current.innerText = "Costo: "+numberFormat2.format((diffHours*product.precio_Vehiculo))
    }


    const fields = async (event) => {
        event.preventDefault();
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        const inicio = new Date(new Date().getFullYear(), 7, event.target[0].value, event.target[1].value)
        const fin = new Date(new Date().getFullYear(), 7, event.target[2].value, event.target[3].value)

        const diffTime = Math.abs(fin - inicio);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 

        const valor = product.precio_Vehiculo * diffHours

        const inicioConv = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(),parseInt(inicio.getHours())-5)
        const finConv = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate(),parseInt(fin.getHours())-5)
        
        const data = await supabaseAdmin
                .from('Reserva')
                .select('id_Reserva')
                .order('id_Reserva', {ascending:false});
        
        const user = await supabaseAdmin
        .from("Usuario")
        .select("id_Usuario")
        .eq("correo_Usuario",session.user.email)

        const update = {
            id_Reserva: (data.data[0].id_Reserva)+1,
            created_at: new Date(),
            estado_Reserva: "Activa",
            valor_Reserva: valor,
            id_Vehiculo: product.id_Vehiculo,
            id_Usuario: user.data[0].id_Usuario,
            fecha_fin_Reserva: finConv,
            fecha_inicio_Reserva: inicioConv
        }       
        
        //        console.log(update)

        let {error} = await supabaseAdmin.from('Reserva').upsert(update,{
            returning:'minimal'
        })
    
        if(error){
            throw error;
        }
        else{
            console.log("Reserva Exitosa")
            Router.push("/Pay/"+parseInt(data.data[0].id_Reserva)+1)
        }
    }  

    return(
        <LayoutCatalogue>
            <div>
                <section className="h-full gradient-form bg-gray-200 md:h-screen">
                    <div className="container px-6 h-full">
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <div className="xl:w-10/12 ">
                                <div className="block bg-white shadow-lg rounded-lg">
                                    <div className="lg:flex lg:flex-wrap g-0">
                                        <div className="lg:w-6/12 px-4 md:px-0 p-16">
                                            <div className="md:p-12 md:mx-6">
                                                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                                                    <form onSubmit={fields}>
                                                        <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                                aria-label="Default select example"
                                                                defaultValue={0}
                                                                onChange={changeInitHour}
                                                                ref={initDate}>
                                                                    <option>Fecha Inicio</option>
                                                                    {days.map(function(i){
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
                                                                onChange={changeEndDate}
                                                                ref={initHour}>
                                                                    <option>Hora Inicio</option>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                        </div>                                                    
                                                        
                                                        <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                                                text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                                                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                                aria-label="Default select example"
                                                                defaultValue={0}
                                                                onChange={changeEndHour}
                                                                ref={endDate}>
                                                                    <option>Fecha Fin</option>
                                                                    
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
                                                                ref={endHour}
                                                                onChange={setTime}>
                                                                    <option>Hora Fin</option>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                        </div>  
                                                        

                                                        <div className="flex justify-center">
                                                            <div className="mb-3 xl:w-96">
                                                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
                                                                    text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                                                                    transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                                    aria-label="Default select example"
                                                                    defaultValue={""}>
                                                                    <option selected>Metodo de Pago</option>
                                                                    <option value="1">Tarjeta de Credito</option>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                                            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                                                            transition duration-150 ease-in-out">Reservar</button>
                                                        
                                                               
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none back_gradient">
                                            <style jsx>{' .back_gradient {background: linear-gradient(to right, #555555, #bdbdbd, #e7e7e7, #ffffff);}'}</style>
                                            <div className="w-full text-white px-4 py-6 md:p-1 md:mx-6">
                                                <h4 className="text-xl font-semibold mb-6">Vehículo Solicitado</h4>
                                                <div className="flex justify-center m-1 h-72 w-full">
                                                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ">
                                                        <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={product.imagen_Vehiculo} alt="img" width={150} height={50} />
                                                        <div className="p-6 flex flex-col justify-start">
                                                        <h5 className="text-gray-900 text-xl font-medium mb-2">{product.marca.desc_Marca+" "+product.modelo.desc_Modelo} </h5>
                                                        <p className="text-gray-700 text-base mb-4">
                                                            {product.categoria.desc_Categoria}
                                                        </p>
                                                        </div>
                                                        
                                                    </div>
                                                    </div>
                                                <label ref={time}></label>
                                                <label ref={cost}></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    const lastUrl = context.req.headers.referer || null
    const idVehiculo = context.params.reserv
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
          .eq('id_Vehiculo', idVehiculo);
      
          const product = data.data[0];
        return {
            props:{
                product, 
                lastUrl
            }
        }
    }
    
    
}
