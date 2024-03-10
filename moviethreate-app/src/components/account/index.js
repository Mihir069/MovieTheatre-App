import React, { useState, useEffect } from 'react';
import './style.css'; 

const AccountPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/account/20960400?api_key=27e7bd3c69a085aeeb14e90dccf23df', options);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="account-page">
      <div className="sidebar">
        <h1>Navigation</h1>
        <ul>
          {/* <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li> */}
        </ul>
      </div>
      <div className="main-content">
        <h1>Account Page</h1>
        {userData ? (
          <div className="user-details">
            <h2>User Details</h2>
            <ul>
              <li>Username: {userData.username}</li>
              <li>ID: {userData.id}</li>
              <li>Language: {userData.iso_639_1}</li>
              <li>Country: {userData.iso_3166_1}</li>
              <li>Adult Content: {userData.include_adult ? 'Yes' : 'No'}</li>
              <li>Name: {userData.name || 'Not provided'}</li>
            </ul>
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
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
