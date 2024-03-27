// import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import UserDetails from '../../components/user-account/user-details';
import FavoriteMovies from '../../components/user-account/favorite-movies';
import MovieWatchList from '../../components/user-account/movie-watchlist';
import './style.css'; 

const AccountPage = () => {
  const [selectedOption,setSelectedOption] = useState('Favorites');

  const handleOptionClick = (option) =>{
    setSelectedOption(option);
  } 
  // if(userData.id === undefined){
  //   return <Navigate to="/login" replace={true} />
  // }

  return (
    <div className="account-page-container p-4">
      <div className="account-details-card row">
        <UserDetails/>
      </div>
      <div className='collection-list m-3 d-inline-flex col-6'>
        <div className={selectedOption === 'Favorites'?'current':''} onClick={()=>handleOptionClick('Favorites')}>
          <h5 className={`px-3 ${selectedOption ==='Favorites'?'current':'' }`}>Favorite</h5>
        </div>
        <div className={selectedOption === 'WatchList'?'current':''} onClick={()=>handleOptionClick('WatchList')}>
          <h5 className={`px-3 ${selectedOption ==='WatchList'?'current':'' }`}>WatchList</h5>
        </div>
      </div>
      {
        selectedOption === 'Favorites' &&
          <div className='fade-in'>
            <FavoriteMovies/>
          </div>
      }
      {
        selectedOption === 'WatchList' &&
        <div className='fade-in'>
          <MovieWatchList/>
        </div>
      }
    </div>
  );
};

export default AccountPage;
