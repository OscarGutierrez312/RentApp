import Header from "./header"
import Footer from "./footer"
import Carousel from "./carousel"

export default function LayoutHome({ children }){
    return(
        <>
            <Header/>
            <Carousel/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}