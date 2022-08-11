import { SessionProvider } from 'next-auth/react'
import React from 'react';
import Router from 'next/router';
import LoaderPage from "../components/loader"
import '/styles/globals.css'

function MyApp({ Component, pageProps:{session, ...pageProps}} ) {
  const [loading, setLoading] = React.useState(false);
  
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
   });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
 

  return (
    <>
    {loading ?
      <LoaderPage/>
    :
      
      <SessionProvider session={session} refetchInterval={0} >
        
            <Component {...pageProps} />
        
      </SessionProvider>
      
      
    }
    </>
    
  )
}

export default MyApp
