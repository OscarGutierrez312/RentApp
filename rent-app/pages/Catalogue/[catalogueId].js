import Link from "next/link";
import Image from "next/image";
import ImageKit from "imagekit";
import {createClient} from "@supabase/supabase-js"
import LayoutCatalogue from "../../components/layout_catalogue";

export default function Catalogue({data, catalogueId}){
    console.log(data.data)
    return (
      <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
          {data.data.map(function(i, idx){
            return (      
              <Link key={idx} href={"/Product/"+catalogueId+"/"+idx}>
                <div key={idx} className="flex justify-center m-10 cursor-pointer">
                  <div className="flex flex-col min-w-full md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2 ring-blue-500 hover:scale-95 transition duration-150 ease-in-out">
                    <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={i.Image} alt="img" width={150} height={50} />
                    <div className="p-6 flex flex-col justify-start">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">{i.Fabricant+" "+i.Model} </h5>
                      <p className="text-gray-700 text-base mb-4">
                        {i.Desc}
                      </p>
                      <p className="text-gray-600 text-xs">Precio: ${i.Fee}/Hora </p>
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
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const catalogueId=params.catalogueId.replace(/\-/g, '+');

    const data = await supabaseAdmin
    .from(catalogueId)
    .select('*')
    .order('id');
    

    return{
        props:{
            data,
            catalogueId
        }
    }
    
  }
  