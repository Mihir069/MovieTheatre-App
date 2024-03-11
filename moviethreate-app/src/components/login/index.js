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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {!loggedIn ? (
            <>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Login</button>
                {formError && <div className="error-message">{formError}</div>}
              </form>
            </>
          ) : (
            <AccountPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
