import { Link } from "react-router-dom";

const User = ({isLoggedIn}) =>{
    // return(
        
    //     <Link to={`/account`}>
    //     <img src="./svg/user-solid.svg" alt="user" height="20px" className=" cursor mx-2" />
    //     </Link>
    // )
    return (
        <div>
          {isLoggedIn ? (
            <img src="existing_user_image_url" alt="user" height="20px" className="cursor mx-2" />
          ) : (
            <Link to="/login">
              <img src="./svg/user-solid.svg" alt="user" height="20px" className="cursor mx-2" />
            </Link>
          )}
        </div>
      );
}
export default User;