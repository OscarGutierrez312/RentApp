import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import LayoutCatalogue from "../../components/layout_catalogue";


export default function UserPage({se}){
    const {data:session} = useSession();

    console.log(!session ? "undefined":session)
    return(
        <LayoutCatalogue>
            
            <div className="container my-56 px-6 mx-auto">
            
            <div className="flex mb-32">
                <h1 className="text-6xl">Tu Vehiculo</h1>
            </div>
            <section className="mb-32 text-gray-800">
                
                <div className="flex flex-wrap">
                <div className="grow-0 shrink-0 basis-auto w-full md:w-2/12 lg:w-3/12">
                    <img src={!session ? "undefined":session.user.image} className="w-full shadow-lg rounded-lg mb-6"
                    alt="" />
                </div>

                <div className="grow-0 shrink-0 basis-auto w-full md:w-10/12 lg:w-9/12 md:pl-6 text-center md:text-left">
                    <h5 className="text-xl font-semibold mb-6">{!session ? "undefined":session.user.name}</h5>
                    <h5 className="text-xl font-semibold mb-6">{!session ? "undefined":session.user.email}</h5>
                    <Link href={"/User/myVehicles"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Mis Vehículos
                        </button>
                    </Link>
                    <Link href={"/User/registerVehicle"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Registrar un Vehiculo
                        </button>
                    </Link>
                    <Link href={"/User/history"}>
                        <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                Historial
                        </button>
                    </Link>
                </div>
                </div>
            </section>           
            
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
    }
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

    const product = data.data[0];
    return{
        props:{
            session
        }
    }
}