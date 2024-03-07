import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useParams } from "react-router-dom";
import { fetchDetailApi } from "../../../services";
import { useEffect } from "react";
import { setMovieImages } from "../../../reducers/movieInfoReducer";
const MovieImages = () =>{
    const movieImages = useSelector((state)=>state.movieInfo.movieImages);
    const dispatch = useDispatch();
    const {movieId} = useParams();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imagesData = await fetchDetailApi(`movie/${movieId}/images`);
                const movieImages = imagesData.backdrops.map(backdrop => ({
                    file_path: backdrop.file_path,
                    aspect_ratio: backdrop.aspect_ratio,
                    height: backdrop.height,
                    width: backdrop.width,
                }));
                dispatch(setMovieImages(movieImages || []));
            } catch (error) {
                console.log("Error fetching cast data:", error);
            }
        };
        
        fetchImage();
    }, [movieId,dispatch]);
    const images = movieImages.map((image,index)=>(
        <img key={index} src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={`Backdrop ${index + 1}`} className="px-1"/>
    ))

    return(
        <div className="backdrop-images-container ">
            <div className="backdrop-images d-inline">
                {images}
            </div>

        </div>
    )
}
export default MovieImages;