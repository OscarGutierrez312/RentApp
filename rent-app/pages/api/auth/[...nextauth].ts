import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    
    providers:[
        Auth0Provider({
            clientId: process.env.AUTH0_ID,
            clientSecret: process.env.AUTH0_SECRET,
            issuer: process.env.AUTH0_ISSUER,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],

    theme: {
        colorScheme: "light",
    },

    callbacks: {
        async jwt({token, user}){
            if(user){
                token.userRole = "admin"
                return token
            }            
        },
        async session({ session, token }) {
            if (token) {
                session.userRole = token.userRole;
            }
            return session;
        }
    },
})


    