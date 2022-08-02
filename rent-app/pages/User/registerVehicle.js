import {createClient} from "@supabase/supabase-js"
import ImageKit from 'imagekit'

//import multiparty from 'multiparty'
//import middleware from 'middleware-nodejs'

import LayoutCatalogue from "../../components/layout_catalogue";


export default function RegisterVehicle({data}){
    
    const fields = async (event) => {
        event.preventDefault();
        const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

        const img = await new ImageKit({
            publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY,
            privateKey: "private_CwIWJa6ZWAMY88qCdDk2TZYnuRE=",
            urlEndpoint: "https://ik.imagekit.io/servEasyCar"
        });

        const file = event.target[0].files[0]
        
        img.upload({
            file: file,
            fileName: "22.png"
        }, function(error, result){
            if(error)console.log(error);
            else console.log(result)
        })

        console.log(file)



        
        

        /* const data = await supabaseAdmin
                .from('Usuario')
                .select('id_Usuario')
                .order('id_Usuario', {ascending:false});
        
        
        const update = {
            id_Usuario: data.data[0].id_Usuario+1,
            created_at: new Date(),
            nombre_Usuario: event.target[0].value+" "+event.target[1].value,
            correo_Usuario: event.target[2].value,
            cont_Usuario: event.target[3].value,
            rol_Usuario: "basico"
        }       
        
        let {error} = await supabaseAdmin.from('Usuario').upsert(update,{
            returning:'minimal'
        })
    
        if(error){
            throw error;
        }
        else{
            Router.push('/Sesion/login');
        } */
    } 

    return(
        <LayoutCatalogue>
            <div className="flex pt-36">
            <form onSubmit={fields} encType="multiparty/form-data">
                <input name="logo" type="file" />
                <button type="submit">Upload</button>
            </form>
            </div>
            

        </LayoutCatalogue>
            
    )
}

export async function getServerSideProps(){
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const img = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
    });
    

    const data = {}

    /* const { data, error } = await supabaseAdmin
    .storage
    .from('avatars')
    .upload('public/bici_1.jpg', file, {
        contentType: 'images/bici_1.jpg'
    }) */

    
    return {
        props:{
            data
        }
    }
}