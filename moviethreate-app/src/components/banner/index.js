import { useState,useEffect } from "react";
import "./style.css"
import { Link } from "react-router-dom";
const MovieBanner = () =>{
    const [currentSlide,setCurrentSlide] = useState(0);
    const banners = [
        {
            image: './svg/movie-banner-1.png',
            alt: 'banner-1'
        },
        {
            image: './svg/movie-banner-2.png',
            alt: 'banner-2'
        },
        {
            image: './svg/movie-banner-3.png',
            alt: 'banner-3'
        }
    ]
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentSlide(prevSlide => (prevSlide === banners.length-1?0:prevSlide+1));
        },5000)
        return(()=>clearInterval(interval))
    },[]);

    const goToSlide = (index)=>{
        setCurrentSlide(index)
    }
    const nextSlide = () =>{
        setCurrentSlide((prevSlide)=>
        prevSlide === banners.length -1 ?0 : prevSlide+1        
        )
    }
    const prevSlide = () =>{
        setCurrentSlide((prevSlide)=>
            prevSlide === 0 ? banners.length-1 : prevSlide - 1
        )
    }
    return(
            <div className="banner">
                <div className="text-container py-sm-2 my-sm-2">
                    <div className="text">
                    <h3>Trends For You</h3>
                    </div>
                    
                </div>
                <div className="slider">

                    {
                        banners.map((banner,index)=>(
                            <div key={index} className={`slide ${index === currentSlide?'active':''}`} onClick={()=>goToSlide(index)}>
                                <Link to="/">
                                    <img src={banner.image} alt={banner.alt} height="500" width="100%"/>
                                </Link>
                                
                            </div>
                        ))
                    }
                    <div className="slider-text p-3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
                    </div>
                </div>
                    <div className="slider-arrow ">
                        <button className="p-2" onClick={prevSlide}>&#10094;</button>
                        <button className="p-2" onClick={nextSlide}>&#10095;</button>
                    </div>
            </div>
    )
}
export default MovieBanner;