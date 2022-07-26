import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { isAbsolute, relative } from 'path';

export default class NextJsCarousel extends Component {
	render() {
        const data =[
            {"name":"/Vehicles/car_1.jpg", "id":"Vehicle 1"},
            {"name":"/Vehicles/car_2.jpg", "id":"Vehicle 2"},
            {"name":"/Vehicles/car_3.jpg", "id":"Vehicle 3"},
            {"name":"/Motorbikes/moto_1.jpg", "id":"MotorBike 1"},
            {"name":"/Motorbikes/moto_2.jpg", "id":"MotorBike 2"},
            {"name":"/Motorbikes/moto_3.jpg", "id":"MotorBike 3"},
            {"name":"/Bycicles/bici_1.jpg", "id":"Bicycle 1"},
            {"name":"/Bycicles/bici_2.jpg", "id":"Bicycle 2"},
            {"name":"/Bycicles/bici_3.jpg", "id":"Bicycle 3"},
        ];
		return (
            
			<div className="flex flex-col  relative z-0 m-2 divide-y-4 divide-cyan-200 divide-solid">
                <div className="text-center  p-20 px-6 mb-9">
                    <h1 className="text-8xl font-bold font-sans mt-0 mb-6 text-[#98c8eb] hover:text-[#a7db87] transition duration-150 ease-in-out">Bienvenido a EasyCar</h1>
                    <h3 className="text-2xl font-thin mb-8 italic">
                        Pide o Arrienda cualquiera de 
                    los tipos de vehiculos disponibles</h3>
                </div>
                <div className="p-10">
                    <Carousel showArrows={true} showIndicators={false} stopOnHover showThumbs={false} infiniteLoop autoPlay>                
                        {data.map(function(i, idx){
                            return (                        
                            <div key={idx} className="flex-place-items-center z-0">
                                <Image src={i.name} alt={idx} width={'100%'} height={'36'} layout={'responsive'}/>
                                <div className="carousel-caption hidden md:block absolute text-center pb-20 ">
                                    <h5 className="text-xl">First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                                <Link href="/Sesion/logout">
                                    <button >
                                        <p className="legend">{i.id}</p>
                                    </button>
                                </Link>                      
                            </div>
                            )
                        })}				
                    </Carousel>
                </div>
                
			</div>
		);
	}
};
