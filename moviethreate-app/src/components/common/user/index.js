import React from "react";
import { Link } from "react-router-dom";

const User = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <Link to="/account">
          <img
            src="./svg/"
            alt="user"
            height="20px"
            className="cursor mx-2"
          />
        </Link>
      ) : (
        <Link to="/login">
          <img
            src="./svg/user-solid.svg"
            alt="user"
            height="20px"
            className="cursor mx-2"
          />
        </Link>
      )}
    </div>
  );
};

export default User;
