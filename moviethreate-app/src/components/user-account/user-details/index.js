import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserApi } from "../../../services";
import { setUserData } from "../../../reducers/userAccountReducer";
import "./style.css";

const UserDetails = () =>{
    const userData = useSelector((state)=>state.userAccount.userData);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUserData = async() =>{
            try{
                const user = await fetchUserApi(`account/20960400`);
                dispatch(setUserData(user||[]));
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    },[dispatch]);

    return(
        <>
        {
          userData ?(
            <div className='user-details-container p-5 d-inline-flex'>
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
              <div className='user-details p-4'>
                <div className='user-name'>
                  {userData.username}
                </div>
                <div className='user-language'>
                  Language: {userData.iso_639_1}
                </div>
                <div className='user-country'>
                  Country: {userData.iso_3166_1}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading user data...</p>
          )
        }
        </>
    )
}
export default UserDetails;