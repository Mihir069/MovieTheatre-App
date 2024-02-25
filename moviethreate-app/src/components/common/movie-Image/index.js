import "./style.css";
const MovieImages = ({movieImages}) =>{
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