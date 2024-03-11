import { useState } from 'react';
import { Redirect } from 'react-router-dom'; 
import './style.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const isPasswordSecure = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
  };

  const isRequired = (value) => value === '' ? false : true;
  const isBetween = (length, min, max) => length < min || length > max ? false : true;

  const checkUsername = () => {
    const min = 3;
    const max = 25;
    const isValid = isRequired(username) && isBetween(username.length, min, max);
    return isValid;
  };

  const checkPassword = () => {
    const isValid = isRequired(password) && isPasswordSecure(password);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "MihirKsah" && password === "Mihir@2024") {
      setLoggedIn(true);
    } else {
      setFormError('Invalid username or password');
    }
  };

  if (loggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {formError && <div className="error-message">{formError}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
