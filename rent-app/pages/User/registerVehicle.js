import {createClient} from "@supabase/supabase-js"
import { decode } from 'base64-arraybuffer'
import { fileURLToPath } from "url";
import LayoutCatalogue from "../../components/layout_catalogue";


export default function RegisterVehicle({data}){
    
    return(
        <LayoutCatalogue>
            
        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(){
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );


  

    const { data, error } = await supabaseAdmin
    .storage
    .from('avatars')
    .upload('public/bici_1.jpg', file, {
        contentType: 'images/bici_1.jpg'
    })

    console.log(file, data)
    return {
        props:{
            data
        }
    }
}