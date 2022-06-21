import {useRouter} from "next/router";
import Link from "next/link";
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Catalogue(){

  const all =[
    {"0":[{"title":"Vehiculo 1", "desc":"Descripción Vehiculo 1", "img":"/images/car_1.jpg", "time":"last updated"},
          {"title":"Vehiculo 2", "desc":"Descripción Vehiculo 2", "img":"/images/car_2.jpg", "time":"last updated"},
          {"title":"Vehiculo 3", "desc":"Descripción Vehiculo 3", "img":"/images/car_3.jpg", "time":"last updated"}]},
    {"1":[{"title":"Motocicleta 1", "desc":"Descripción Motocicleta 1", "img":"/images/moto_1.jpg", "time":"last updated"},
          {"title":"Motocicleta 2", "desc":"Descripción Motocicleta 2", "img":"/images/moto_2.jpg", "time":"last updated"},
          {"title":"Motocicleta 3", "desc":"Descripción Motocicleta 3", "img":"/images/moto_3.jpg", "time":"last updated"}] },
    {"2":[{"title":"Bicicleta 1", "desc":"Descripción Bicicleta 1", "img":"/images/bici_1.jpg", "time":"last updated"},
          {"title":"Bicicleta 2", "desc":"Descripción Bicicleta 2", "img":"/images/bici_2.jpg", "time":"last updated"},
          {"title":"Bicicleta 3", "desc":"Descripción Bicicleta 3", "img":"/images/bici_3.jpg", "time":"last updated"}]}
  ];

    const products = new Array();
    const router = useRouter();
    if(!(router.query==undefined)){
      const query = router.query;
      const name = query.id;
      if(!(name == undefined)){            
        all[name][name].map(function(i){products.push(i)})
      } 
    }
    
    return (
      <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
        {products.map(function(i, idx){
                    return (      
                      <Link key={idx} href="/Products/preview_product">
                        <div key={idx} className="flex justify-center m-10">
                          <div className="flex flex-col min-w-full md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2 ring-blue-500 hover:scale-95 hover:ring-8 transition duration-150 ease-in-out">
                            <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={i.img} alt="img" />
                            <div className="p-6 flex flex-col justify-start">
                              <h5 className="text-gray-900 text-xl font-medium mb-2">{i.title}</h5>
                              <p className="text-gray-700 text-base mb-4">
                                {i.desc}
                              </p>
                              <p className="text-gray-600 text-xs">{i.time} {idx} mins ago</p>
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