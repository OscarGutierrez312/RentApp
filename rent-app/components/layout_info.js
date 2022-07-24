import Header from "./header"
import Footer from "./footer"

export default function LayoutInfo({ children }){
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}