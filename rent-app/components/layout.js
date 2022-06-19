import Header from "./header"
import Footer from "./footer"


export default function Layout({ children }){
    return(
        <>
            <main>{children}</main>
            <Footer/>
        </>
    )
}