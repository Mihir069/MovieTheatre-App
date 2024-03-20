import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './style.css'; 

const AccountPage = () => {
  const userData = useSelector((state)=>state.userAccount.userData);
  const favoriteMovies = useSelector((state)=>state.favoriteMovie.favoriteMovies);

  if(userData.id === undefined){
    return <Navigate to="/login" replace={true} />
  }

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
            {favoriteMovies.map((favorite)=>(
              <li key={favorite.id}>
                <div>{favorite.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
