import Link from "next/link";
import LayoutCatalogue from "../../components/layout_catalogue";


export default function Reserv(){
    return(
        <LayoutCatalogue>
            <div className="flex mt-16 pt-10">
                <h1 className="text-9xl">Pagina de Usuario</h1>
            </div>
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
        </LayoutCatalogue>
            
    )
}