import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/react"
import Layout from "../../components/layout"

export default function Login(){

    const {data: session, status} = useSession()
    const loading = status === "loading"

    return (
        <Layout>
            <script>
                preventDefault()
                signIn()
            </script>
            <div>
                <h1>Página de Login</h1>
                
            </div> 
        </Layout>       
    );
}