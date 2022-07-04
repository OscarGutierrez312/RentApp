import {createClient} from "@supabase/supabase-js"


export default function BaseDatos({data}){
    
    console.log(data);
    
    return(
        <div>
            <h1>
                Prueba de Bases de datos
            </h1>
        </div>
    );
}

export async function getStaticProps(){
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const data = await supabaseAdmin
    .from('User')
    .select('*')
    .order('id');


    const update = {
        id: 3,
        created_at: new Date(),
        name: "usuario de prueba 1",
        email: "usuario@correo.udistrital.edu.co",
        password: "contrasenadeusuariodeprueba"
    }

    let {error} = await supabaseAdmin.from('User').upsert(update,{
        returning:'minimal'
    })

    if(error){
        throw error;
    }

    return{
        props:{
            data
        }
    }
}

