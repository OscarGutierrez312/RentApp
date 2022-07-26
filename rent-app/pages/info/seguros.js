import Head from "next/head"
import Link from "next/link"
import LayoutInfo from "../../components/layout_info"


export default function Manual(providers) {
    return(
        <LayoutInfo>
          <div className="container my-24 px-6 mx-auto">
              
              <section className="mb-32 text-gray-800">
                <h2 align="center" className="text-7xl italic text-[#e8b984]">Informacion De Seguros.</h2>

                <div className="flex flex-wrap mb-12 md:mb-0">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://www.avis.com/content/dam/avis/extras/Protections-Default.png" className="w-full shadow-lg rounded-lg mb-6"
                      alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">Exoneración En Caso De Daños Por Colisión (CDW).</h5>
                    
                    <p className="text-gray-700 text-base mb-4">
                        Su plan alternativo sólido. Con CDW, estará protegido si su seguro personal o tarjeta de crédito le cubre <br></br>
                        por pérdidas por un vehículo alquilado que haya sido robado o dañado.
                    </p>

                  </div>
                </div>


                <div className="flex flex-wrap mb-12 md:mb-0">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://www.avis.com/content/dam/avis/extras/PAI.png" className="w-full shadow-lg rounded-lg mb-6"
                      alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">Seguro individual contra accidentes (PAI).</h5>
                    <p className="text-gray-700 text-base mb-4">
                    Duerma profundamente. Con PAI, usted está protegido hasta en el peor de los 
                    casos después de un accidente con cobertura.
                    </p>
                  </div>
                </div>


                <div className="flex flex-wrap">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://www.avis.com/content/dam/avis/extras/ALI.png" 
                        className="w-full shadow-lg rounded-lg mb-6"
                        alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">Seguro de responsabilidad civil adicional (ALI). </h5>
                    <p className="text-gray-700 text-base mb-4">
                    Lo colocamos a usted en el asiento del conductor. Con ALI, usted está cubierto con la póliza de responsabilidad
                     civil primaria por hasta $2 millones.
                    </p>
                  </div>
                </div>
              </section>

              
            </div>
        </LayoutInfo>
    )
}