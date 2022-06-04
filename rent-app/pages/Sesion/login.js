import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/react"


export default function Login(){

    const {data: session, status} = useSession()
    const loading = status === "loading"

    return (
        <LayoutSesion>
            <script>
                preventDefault()
                signIn()
            </script>
            <div>
                <h1>Página de Login</h1>
                
            </div> 
        </LayoutSesion>       
    );
}