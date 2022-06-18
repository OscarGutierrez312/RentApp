import Image from 'next/image';
import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class NextJsCarousel extends Component {
	render() {
        const data =[
            {"name":"/images/Escudo_UD.png", "id":"Image 1"},
            {"name":"/images/Escudo_UD.png", "id":"Image 2"},
            {"name":"/images/Escudo_UD.png", "id":"Image 3"},
            {"name":"/images/Escudo_UD.png", "id":"Image 4"},
            {"name":"/images/Escudo_UD.png", "id":"Image 5"},
        ];
		return (
			<div className="flex flex-col space-y-20">
                <div className="flex justify-center">
                    <div className="block pt-20 rounded-lg bg-white max-w-sm">
                        <div className="flex space-x-2  justify-center">
                            <h1 className="text-6xl inline-block py-2 px-2.5
                                            align-text-top whitespace-nowrap text-center
                                            font-thin bg-blue-400 text-white rounded">
                                Bienvenido a EasyCar
                            </h1>
                        </div>                    
                        <p >
                        Ejemplo de descripción de la página de inicio de la aplicación de renta de vehiculos
                        </p> 
                    </div>
                </div>
                 
			    <Carousel showArrows={true} stopOnHover showThumbs={false} infiniteLoop autoPlay>                
                {data.map(function(i, idx){
                    return (                        
                    <div key={idx} className="flex-place-items-center">
                        <Image src={i.name} alt={idx} width={250} height={250}/>
                        <p className="legend">{i.id}</p>
                    </div>
                    )
                })}				
			    </Carousel>
			</div>
		);
	}
};
