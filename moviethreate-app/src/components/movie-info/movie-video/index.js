import { useEffect } from "react";
import { fetchDetailApi } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setVideo } from "../../../reducers/movieInfoReducer";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

const Video = () => {
    const video = useSelector((state) => state.movieInfo.video);
    const dispatch = useDispatch();
    const {movieId} = useParams();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const videosData = await fetchDetailApi(`movie/${movieId}/videos`);
                const trailer = videosData.results.find((clip) => clip.type === "Trailer");
                if (trailer) dispatch(setVideo(trailer.key));
            } catch (error) {
                console.log("Error fetching video:", error);
            }
        };

        fetchVideo();
    }, [movieId, dispatch]);

    return (
        <YouTube videoId={video} />
    );
};

export default Video;
