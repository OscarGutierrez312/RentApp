import Header from "./header"
import Footer from "./footer"


export default function LayoutCatalogue({ children }){
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}