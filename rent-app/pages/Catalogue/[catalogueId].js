import Link from "next/link";
import Image from "next/image";
import ImageKit from "imagekit";
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Catalogue({catalogue, catalogueId}){
    
    return (
        <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
        {catalogue.map(function(i, idx){
                    return (      
                      <Link key={idx} href={"/Product/"+catalogueId+"/"+idx}>
                        <div key={idx} className="flex justify-center m-10">
                          <div className="flex flex-col min-w-full md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2 ring-blue-500 hover:scale-95 hover:ring-8 transition duration-150 ease-in-out">
                            <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={i.img} alt="img" width={150} height={50} />
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


export async function getServerSideProps({params}){
    const all = {
        vehicles:[{"title":"Vehiculo 1", "desc":"Descripción Vehiculo 1", "img":"/Vehicles/car_1_F11CfzUlMm.jpg", "time":"last updated"},
              {"title":"Vehiculo 2", "desc":"Descripción Vehiculo 2", "img":"/Vehicles/car_2_uEgajM_kQ.jpg", "time":"last updated"},
              {"title":"Vehiculo 3", "desc":"Descripción Vehiculo 3", "img":"/Vehicles/car_3_1QA7rXvG7.jpg", "time":"last updated"}],
        motorbikes:[{"title":"Motocicleta 1", "desc":"Descripción Motocicleta 1", "img":"/Motorbikes/moto_1_Qlu5utdz0.jpg", "time":"last updated"},
              {"title":"Motocicleta 2", "desc":"Descripción Motocicleta 2", "img":"/Motorbikes/moto_2_DzYK3IZSZY.jpg", "time":"last updated"},
              {"title":"Motocicleta 3", "desc":"Descripción Motocicleta 3", "img":"/Motorbikes/moto_3_4-GfsBVjb.jpg", "time":"last updated"}],
        bycicles:[{"title":"Bicicleta 1", "desc":"Descripción Bicicleta 1", "img":"/Bycicles/bici_1_sJSJkZhgM.jpg", "time":"last updated"},
              {"title":"Bicicleta 2", "desc":"Descripción Bicicleta 2", "img":"/Bycicles/bici_2_17LTbyFpA.jpg", "time":"last updated"},
              {"title":"Bicicleta 3", "desc":"Descripción Bicicleta 3", "img":"/Bycicles/bici_3__Ch4Fyn4t.jpg", "time":"last updated"}]
    };

    const catalogueId=params.catalogueId.replace(/\-/g, '+');
    
    const catalogue=all[catalogueId];
    
    return{
        props:{
            catalogue,
            catalogueId
        }
    }
    
  }
  