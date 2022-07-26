import NextAuth from "next-auth"
import jwt from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {createClient} from "@supabase/supabase-js"
import { redirect } from "next/dist/server/api-utils"


export default NextAuth({
    pages:{
        error:'/Sesion/login'
    },

    providers:[
        
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                mail: { label: "Username", type: "text", placeholder: "Ingresa tu Correo" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                //console.log(credentials);

                const supabaseAdmin = await createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.SUPABASE_SERVICE_ROLE_KEY
                );
            
                const data = await supabaseAdmin
                .from('Usuario')
                .select('*')
                .eq('correo_Usuario', credentials.mail);
                
                //console.log(data)

                if(data.error || data.data.length == 0){

                    return data.error
                }else{
                    if (data.data[0].correo_Usuario === credentials.mail && 
                        data.data[0].cont_Usuario === credentials.password){                            
                            const user = {name: data.data[0].nombre_Usuario, email: data.data[0].correo_Usuario, image: ""}
                            return user
                        }
                    else{

                        return null
                    }                    
                }
            }
        })
    ],   


    

    secret: process.env.JWT_SECRET,

    jwt:{
        secret: process.env.JWT_SECRET,
        encryption : true
    },

    theme: {
        colorScheme: "light",
    },

    

    callbacks: {
     
        async session({session, token}){
            //console.log(session)
            session.user.tag = session.user.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();
            session.user.uid = token.sub
            return session;
        }  
    }
})



    