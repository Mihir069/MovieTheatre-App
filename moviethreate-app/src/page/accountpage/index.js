import React, { useState, useEffect } from 'react';
import './style.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserApi } from '../../services';
import { setUserData } from '../../reducers/userAccountReducer';

const AccountPage = () => {
  const userData = useSelector((state)=>state.userAccount.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const user = await fetchUserApi(`account/20960400`);
        console.log("------user-----",user)
        dispatch(setUserData(user || []))
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [dispatch]);

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
