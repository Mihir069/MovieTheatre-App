import React, { useState } from 'react';
import AccountPage from '../../page/accountpage';
import "./style.css"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "MihirKsah" && password === "Mihir@2024") {
      setLoggedIn(true);
   
    } else {
      setFormError('Invalid username or password');
    }
  };

  return (
    <div className="container mb-4 my-4">
      <div className="row justify-content-center">
        {!loggedIn ? (
          <div className='login p-5'>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className='d-block mb-2' for="username">Username:</label>
                <input
                  type="text"
                  className="form-control p-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label className='d-block mb-2' for="password">Password:</label>
                <input
                  type="password"
                  className="form-control p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className='px-3 py-2'>Login</button>
              {formError && <div className="error-message mt-2">{formError}</div>}
            </form>
          </div>
        ) : (
          <AccountPage />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
