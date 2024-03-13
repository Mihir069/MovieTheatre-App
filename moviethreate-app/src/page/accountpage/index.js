import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavMovieApi, fetchUserApi } from '../../services';
import { setUserData } from '../../reducers/userAccountReducer';
import { setfavoriteMovies } from '../../reducers/favoriteMovieReducer';
import './style.css'; 

const AccountPage = () => {
  const userData = useSelector((state)=>state.userAccount.userData);
  const favoriteMovies = useSelector((state)=>state.favoriteMovie.favoriteMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const user = await fetchUserApi(`account/20960400`);
        dispatch(setUserData(user || []));

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [dispatch]);
  
  useEffect(()=>{
    const fetchFavMovies = async ()=>{
      try{
        const favoriteMovieData = await fetchFavMovieApi(`account/20960400/favorite/movies`);
        dispatch(setfavoriteMovies(favoriteMovieData||[]));
      }catch(error){
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchFavMovies();
  },[dispatch]);

  return (
    <div className="account-page d-flex">
      <div className="main-content">
        {userData ? (
          <div className="user-details">
            <div className="avatar">
              {userData.avatar && userData.avatar.gravatar.hash && (
                <img
                  src={`https://www.gravatar.com/avatar/${userData.avatar.gravatar.hash}`}
                  alt="Gravatar"
                />
              )}
              {userData.avatar && userData.avatar.tmdb.avatar_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${userData.avatar.tmdb.avatar_path}`}
                  alt="TMDB Avatar"
                />
              )}
            </div>
            <h2>User Details</h2>
            <ul>
              <li>Username: {userData.username}</li>
              <li>ID: {userData.id}</li>
              <li>Language: {userData.iso_639_1}</li>
              <li>Country: {userData.iso_3166_1}</li>
              <li>Adult Content: {userData.include_adult ? 'Yes' : 'No'}</li>
              <li>Name: {userData.name || 'Not provided'}</li>
            </ul>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="favorite-movies">
          <h2>Favorite Movies</h2>
          <ul>
            <li>
            {favoriteMovies.map((favorite)=>(
              <div >
                {favorite.title}
              </div>
            ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
