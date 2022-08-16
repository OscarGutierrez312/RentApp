import Layout from "../../components/layout";
export default function Comments(){
    return(
        <Layout>
            <div className="flex justify-center my-48">
                <div className="mb-3 xl:w-[70%] xl:h-96">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-3xl inline-block mb-2 text-gray-700"
                    >Escribemos tus comentarios</label>
                    <textarea
                    className="form-control block w-full h-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                        border border-solid border-gray-300 rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Observaciones"
                    ></textarea>
                    <button
                        className="inline-block px-6 py-2.5 bg-blue-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="submit"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        >
                        enviar
                    </button>
                </div>
            </div>
        </Layout>
    );
}


