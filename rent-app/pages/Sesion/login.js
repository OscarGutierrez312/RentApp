import Link from "next/link"
import Image from "next/image"
import {getProviders, getSession, signIn, signOut, useSession} from "next-auth/react"
import Layout from "../../components/layout"
import styles from "../../styles/login.module.css"
export default function Login({providers}){

    const {data: session, status} = useSession()
    
    
    return (
        <Layout>            
            <div>
            <section className="h-full gradient-form bg-gray-200 md:h-screen">
                <div className="container py-12 px-6 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                        <div className="lg:flex lg:flex-wrap g-0">
                            <div className="lg:w-6/12 px-4 md:px-0">
                            <div className="md:p-12 md:mx-6">
                                <div className="text-center">
                                <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">EasyCar</h4>
                                </div>
                                <form>
                                <p className="mb-4">Ingresa tu Usuario y Contraseña</p>
                                <div className="mb-4">
                                    <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Username"
                                    />
                                </div>
                                    <div className="mb-4">
                                    <input
                                    type="password"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Password"
                                    />
                                </div>
                                <div className="text-center pt-1 mb-12 pb-1">
                                    <button
                                    className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    
                                    >
                                    Log in
                                    </button>
                                    <style jsx>{' button {background: linear-gradient(to right, #3bc4fa, #73aafd, #5f1ef8, #7a09fa);}'}</style>
                                    <a className="text-gray-500" href="#!">¿Olvidaste la Contraseña?</a>
                                </div>
                                <div className="flex items-center justify-between pb-6">
                                    <p className="mb-0 mr-2">¿No Tienes Una Cuenta?</p>
                                    <button
                                    type="button"
                                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    >
                                    Registrate
                                    </button>
                                </div>
                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>
                                <div className=" button_google px-7 py-3 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                        >                               
                                    {Object.values(providers).map((provider) => (
                                        
                                        <a key={provider.name}
                                        
                                        role="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                                        >
                                        <style jsx>{'.button_google:background-color: #3b5998'}</style>
                                        <Image src="/google-g.svg" height={15} width={20}></Image>
                                        Continue with {provider.name}
                                    </a>
                                    ))}
                                </div>
                                </form>
                            </div>
                            </div>
                            <div
                            className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none back_gradient"
                            >
                            <style jsx>{' .back_gradient {background: linear-gradient(to right, #3bc4fa, #73aafd, #5f1ef8, #7a09fa);}'}</style>
                            <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                <h4 className="text-xl font-semibold mb-6">Ingresa y Solicita un Vehículo</h4>
                                <p className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        </Layout>       
    );
}

export async function getServerSideProps(context){
    const providers = await getProviders();
    const session = await getSession(context);

    return{
        props:{
            providers,
            session,
        },
    }
}