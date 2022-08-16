import Header from "./header"
import { useState } from "react"
import Footer from "./footer"
import ColorContext, { ColorProvider } from "../context/ColorContext"

export default function LayoutCatalogue({ children }){
    const [color, setColor] = useState(false)
    const colorChange = async (event) => {
        //console.log(event.target.checked)
        setColor(event.target.checked)
    }
    return(
        
        <ColorProvider value={color}>
        <Header/>
        <div className="-mt-32 fixed z-10
            lg:flex lg:flex-col lg:items-start lg:flex-1 lg:w-0 lg:ml-10 
            xl:items-center xl:ml-[50%] justify-end">
            <div className="flex justify-center">
                <div>
                    <div className="form-check ">
                        <input className="absolute form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" 
                        type="checkbox" value="" id="color" onClick={colorChange}/>
                        <label className="form-check-label ml-6 inline-block text-gray-800" >Modo Daltónicos</label>
                    </div>
                </div>
            </div>
        </div>
        <main>{children}</main>
        <Footer/>
    </ColorProvider>  
    )
}