import { Link } from "react-router-dom";

const User = () =>{
    return(
        <Link to={`/account`}>
        <img src="./svg/user-solid.svg" alt="user" height="20px" className=" cursor mx-2" />
        </Link>
    )
}
export default User;