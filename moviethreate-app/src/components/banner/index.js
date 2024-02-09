import { useState,useEffect } from "react";
import "./style.css"
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
    return(
            <div className="banner">
                <div className="text-container">
                    <h1>Bnner</h1>
                </div>
                <div className="slider">
                    {
                        banners.map((banner,index)=>(
                            <div key={index} className={`slide ${index === currentSlide?'active':''}`} onClick={()=>goToSlide(index)}>
                                <img src={banner.image} alt={banner.alt} height="500" width="100%"/>
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}
export default MovieBanner;