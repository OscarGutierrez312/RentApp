
import ImageKit from "imagekit";
import Image from "next/image";

export default function Regist({images}){
    return(
        <>
        <div>
            <h1>
                Prueba de pagina de carga de imagenes
            </h1>
        </div>
        <Upload/>
        {images.map(({ fileId, name, filePath }) => (
            <div key={fileId}>
                <h1>{filePath}</h1>
				<Image src={filePath} alt={name} width={512} height={512} />
			</div>
		))}
        </>      
        
        
    );
}

export async function getStaticProps(){
    const imagekit = new ImageKit({
        publicKey : process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_API_KEY,
        privateKey :process.env.IMAGE_KIT_PRIVATE_KEY ,
        urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
    });
    const images = await imagekit.listFiles({
		path:"Bycicles"
	});

	return {
		props: {
			images,
		},
		revalidate: 2,
	};
}