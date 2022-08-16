import Header from "./header"
import Footer from "./footer"
import { useState } from "react"
import ColorContext, { ColorProvider } from "../context/ColorContext"

export default function Layout({ children }){
    const [color, setColor] = useState(false)
    const colorChange = async (event) => {
        //console.log(event.target.checked)
        setColor(event.target.checked)
    }
    return(
        
    <ColorProvider value={color}>
        
        
        <main>{children}</main>
        <Footer/>
    </ColorProvider>  
    )
}