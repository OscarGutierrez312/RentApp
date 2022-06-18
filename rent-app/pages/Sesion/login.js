import Link from "next/link"
import {getProviders, getSession, signIn, signOut, useSession} from "next-auth/react"
import Layout from "../../components/layout"

export default function Login({providers}){

    const {data: session, status} = useSession()
    
    
    return (
        <Layout>            
            <div>
                <h1 className="text-9xl auto-rows-auto">Página de Login</h1>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                            <span>Sign in with {provider.name}</span>
                        </button>
                    </div>
                ))}
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