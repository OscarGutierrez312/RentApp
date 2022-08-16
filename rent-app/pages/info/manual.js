import Head from "next/head"
import Link from "next/link"
import LayoutInfo from "../../components/layout_info"


export default function Manual(providers) {
    return(
        <LayoutInfo>
            <div className="container my-24 px-6 mx-auto">
              

              <section className="mb-32 text-gray-800">
                <h2 align="center" className="text-7xl italic text-[#e8b984]" >Manual de Solicitud</h2>

                <div className="flex flex-wrap mb-12 md:mb-0">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/step.png" className="w-full shadow-lg rounded-lg mb-6"
                      alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">¿Cómo reservar?</h5>
                    
                    <p className="text-gray-700 text-base mb-4">
                      <ol>
                        <li>
                          <b>1. Seleccionar vehiculo:</b>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                                Ingresa a nuestas categorias y luego escoge entre los vehículos disponibles.
                            </p>
                        </li>
                        <li>
                          <b>2. Seleccionar fecha de alquiler:</b>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                                Ingresa la fecha de recogida y la fecha de devolución del vehículo.
                            </p>
                        </li>
                        <li>
                          <b>3. Escoger entre nuestra gama de seguros:</b>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                                Escoge entre nuestra gama de seguros el que más se acomode a tí.
                            </p>
                        </li>
                        <li>
                          <b>4. Informacion de pago:</b>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                                Ingresa los datos personales requeridos para efectuar el pago.
                            </p>
                        </li>
                      </ol>
                    </p>

                  </div>
                </div>


                <div className="flex flex-wrap mb-12 md:mb-0">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://cdn-icons-png.flaticon.com/512/69/69211.png" className="w-full shadow-lg rounded-lg mb-6"
                      alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">Requisitos:</h5>
                    <p className="text-gray-700 text-base mb-4">
                      <ol>

                          <li>
                            <b>- Para Personas:</b>
                              <li>Licencia de conducción vigente.</li>
                              <li>Tarjeta de crédito para garantía.</li>
                              <li>Edad entre los 21 y 65 años.</li>
                          </li>

                          <li>
                            <b>- Para Empresas:</b>
                              <li>Licencia de conducción vigente.</li>
                              <li>Tarjeta de crédito para garantía.</li>
                              <li>Edad entre los 21 y 65 años.</li>
                          </li>

                          <li>
                            <b>- Tarjeta de crédito:</b>
                              <p>Es indispensable para hacer el pago y la garantía, puede ser del titular de la reserva 
                                o un acompañante presente al momento de retirar el vehículo. </p>
                          </li>
                          
                        </ol>
                    </p>
                  </div>
                </div>


                <div className="flex flex-wrap">
                  <div className="grow-0 shrink-0 basis-auto w-2/12">
                    <img src="https://www.svgrepo.com/show/17691/present-icon.svg" 
                        className="w-full shadow-lg rounded-lg mb-6"
                        alt="" />
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-10/12 pl-4 md:pl-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">¿Qué Incluye?:</h5>
                    <p className="text-gray-700 text-base mb-4">
                      <ol>

                      <li>
                        <b>- Incluye:</b>
                          <li>Dias de renta pactados.</li>
                          <li>Kilometraje libre.</li>
                          <li>Asistencia 24/7</li>
                      </li>

                      <li>
                        <b>- No incluye:</b>
                          <li>Lavado.</li>
                          <li>Gasolina.</li>
                          <li>Infracciones de tránsito.</li>
                      </li>

                      <li>
                        <b>- Cobertura total:</b>
                          <p>Puedes adquirir con tu franquicia de tarjeta crédito GRATIS el seguro de cobertura total que te reintegra el 
                            valor por deducibles en caso de algún incidente, o también comprarlo con una aseguradora, te recomendamos hacerlo.</p>
                      </li>

                      </ol>
                    </p>
                  </div>
                </div>
              </section>

              
            </div>

        </LayoutInfo>
    )
}

