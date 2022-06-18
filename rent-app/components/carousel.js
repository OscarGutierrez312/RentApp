import Image from 'next/image';
import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class NextJsCarousel extends Component {
	render() {
        const data =[
            {"name":"/images/car_1.jpg", "id":"Vehicle 1"},
            {"name":"/images/car_2.jpg", "id":"Vehicle 2"},
            {"name":"/images/car_3.jpg", "id":"Vehicle 3"},
            {"name":"/images/moto_1.jpg", "id":"MotorBike 1"},
            {"name":"/images/moto_2.jpg", "id":"MotorBike 2"},
            {"name":"/images/moto_3.jpg", "id":"MotorBike 3"},
            {"name":"/images/bici_1.jpg", "id":"Bicycle 1"},
            {"name":"/images/bici_2.jpg", "id":"Bicycle 2"},
            {"name":"/images/bici_3.jpg", "id":"Bicycle 3"},
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
                    <div key={idx} className="flex-place-items-center z-0">
                        <Image src={i.name} alt={idx} width={'100%'} height={'40'} layout={'responsive'} />
                        <p className="legend">{i.id}</p>
                    </div>
                    )
                })}				
			    </Carousel>
			</div>
		);
	}
};
