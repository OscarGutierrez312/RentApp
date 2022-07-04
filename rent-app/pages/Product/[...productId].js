import Link from "next/link";
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Product({product}){
    console.log(product)
    return (
        <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
          <div className="flex justify-center m-5">
            <div className="grid grid-flow-row-dense grid-cols-3 min-w-[1700px] min-h-[850px] p-10 max-h-[550px] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2">
              <div className="col-span-2">
                <img className="h-200 w-200 rounded-t-lg rounded-lg md:rounded-none md:rounded-l-lg" src={product.img} alt="img" />
              </div>
              <div>
                <div className="p-6  justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{product.title}</h5>
                  <p className="text-gray-700 mb-4 text-sm">
                  {product.desc}
                  </p>
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Reservar</button>
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-cyan-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Solicitar</button>
                  <button type="button" className="inline-block px-6 py-2.5 m-10 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                    Contactar</button>
                </div>
              </div>             
            </div>
          </div>                         
        </div>
      </LayoutCatalogue>
      );
}


export async function getServerSideProps({resolvedUrl}){
    const all = {
        vehicles:[{"title":"Vehiculo 1", "desc":"Descripción Vehiculo 1", "img":"/images/car_1.jpg", "time":"last updated"},
              {"title":"Vehiculo 2", "desc":"Descripción Vehiculo 2", "img":"/images/car_2.jpg", "time":"last updated"},
              {"title":"Vehiculo 3", "desc":"Descripción Vehiculo 3", "img":"/images/car_3.jpg", "time":"last updated"}],
        motorbikes:[{"title":"Motocicleta 1", "desc":"Descripción Motocicleta 1", "img":"/images/moto_1.jpg", "time":"last updated"},
              {"title":"Motocicleta 2", "desc":"Descripción Motocicleta 2", "img":"/images/moto_2.jpg", "time":"last updated"},
              {"title":"Motocicleta 3", "desc":"Descripción Motocicleta 3", "img":"/images/moto_3.jpg", "time":"last updated"}],
        bycicles:[{"title":"Bicicleta 1", "desc":"Descripción Bicicleta 1", "img":"/images/bici_1.jpg", "time":"last updated"},
              {"title":"Bicicleta 2", "desc":"Descripción Bicicleta 2", "img":"/images/bici_2.jpg", "time":"last updated"},
              {"title":"Bicicleta 3", "desc":"Descripción Bicicleta 3", "img":"/images/bici_3.jpg", "time":"last updated"}]
    };
    
    const info=resolvedUrl.split("/");
    
    const product=all[info[2]][info[3]];

    return{
        props:{
            product            
        }
    }
    
}