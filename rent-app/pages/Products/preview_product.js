import {useRouter} from "next/router";
import Link from "next/link";

import LayoutCatalogue from "../../components/layout_catalogue";
import Image from "next/image";

export default function Catalogue(){

      
    return (
      <LayoutCatalogue>
        <div className="flex flex-col justify-center my-20 bg-blend-color">          
          <div className="flex justify-center m-5">
            <div className="grid grid-flow-row-dense grid-cols-3 min-w-[1700px] min-h-[950px] p-10 max-h-[550px] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg ring-2">
              <div className="col-span-2">
                <img className="h-200 w-200 rounded-t-lg rounded-lg md:rounded-none md:rounded-l-lg" src="/images/bici_1.jpg" alt="img" />
              </div>
              <div>
                <div className="p-6  justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">Bicicleta 1</h5>
                  <p className="text-gray-700 mb-4 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis distinctio itaque libero culpa ad ea eos porro, dolorem nobis ipsa eius quisquam dignissimos ducimus veritatis enim quasi. Explicabo excepturi sequi distinctio cupiditate et eligendi amet beatae rerum blanditiis ipsam. Voluptas, animi porro quo natus minima, libero id vitae modi fugit eaque earum amet iusto adipisci rerum voluptatum assumenda tempore expedita! Beatae modi, voluptate vero tempora possimus sequi illo blanditiis animi dolore reiciendis, quisquam, fugit molestiae soluta enim dicta eius inventore! Aperiam nobis odit consequatur perferendis, iste harum maxime. Ad et blanditiis at libero. Officia quo officiis ab minus eaque ea laborum itaque eligendi consectetur veniam quasi ipsam rerum corrupti architecto quibusdam quos, molestias cupiditate repellat beatae at et unde distinctio. Fugiat incidunt reiciendis id accusantium, totam sed expedita debitis natus aut quia quas quis deleniti veniam rerum omnis porro consequuntur quibusdam sint alias excepturi, amet, illo unde saepe. Ipsa, minus numquam, nisi praesentium tenetur ullam totam ad, quo aperiam consequatur inventore fugit! Corporis eveniet laudantium architecto! Nisi, voluptates suscipit, possimus dolorum cum labore autem deleniti mollitia blanditiis, deserunt ipsum. Earum reprehenderit perferendis tempore ea odio. Fugiat totam, quod amet impedit, sit repellat illo quae, magni dolor praesentium iste dignissimos minus velit odit! Nesciunt, minus? Esse cum nam, obcaecati asperiores perspiciatis facilis architecto ipsam molestias corporis deserunt commodi? Asperiores velit voluptas ea ullam laboriosam inventore earum, beatae iste doloribus placeat. Ut inventore voluptate dolorem corporis delectus, quae eius, ipsam voluptatibus vero consequatur quos laudantium magni consectetur. Aliquam aperiam ipsam ab aut!
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