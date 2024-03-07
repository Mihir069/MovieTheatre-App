import { useEffect } from "react";
import { fetchDetailApi } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setReview } from "../../../reducers/movieInfoReducer";
import { useParams } from "react-router-dom";

const Review = () => {
    const review = useSelector((state) => state.movieInfo.review);
    const dispatch = useDispatch();
    const {movieId} = useParams();
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await fetchDetailApi(`movie/${movieId}/reviews`);
                const reviews = reviewsData.results.map((review) => ({
                    id: review.id,
                    author: review.author,
                    content: review.content,
                    rating: review.author_details.rating,
                    created_at: review.created_at,
                }));
                dispatch(setReview(reviews || []));
            } catch (error) {
                console.log("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [movieId, dispatch]);

    const reviews = review.map((review) => (
        <div key={review.id} className="review">
            <h2>{review.author}</h2>
            {review.rating && <p>Rating: {review.rating}</p>}
            <p>{review.content}</p>
            <p>Created at: {review.created_at}</p>
        </div>
    ));

    return <div className="review-container">{reviews}</div>;
};

export default Review;
