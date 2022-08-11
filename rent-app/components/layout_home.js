import Header from "./header"
import Footer from "./footer"


export default function LayoutHome({ children }){
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}