import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../../slices/authSlice';
import './Auth.css';

// eslint-disable-next-line react/prop-types
function Auth({ onLogin }) {
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    // Load user data from localStorage if available
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(login(user));  // Set user state in Redux
      onLogin(user);  // Optionally pass user to parent
    }
  }, [dispatch, onLogin]);

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { username, password }
      });
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Persist user in localStorage
        dispatch(login(user));  // Use Redux action to set user state
        onLogin(user);  // Optionally pass user to parent
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while logging in.', error);
    }
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { username }
      });
      const userExists = response.data.some((user) => user.username === username);

      if (userExists) {
        setError('Username already exists');
        return;
      }

      const newUser = { 
        username, 
        password, 
        lists: [] 
      };

      await axios.post('http://localhost:5000/users', newUser);

      localStorage.setItem('user', JSON.stringify(newUser)); // Persist newUser in localStorage
      dispatch(login(newUser));  // Use Redux action to set user state
      onLogin(newUser);  // Optionally pass user to parent
    } catch (error) {
      setError('An error occurred while registering.', error);
    }
  };

  const handleSubmit = () => {
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'SIGN UP' : 'SIGN IN'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="auth-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-field"
      />
      {isRegistering && (
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="auth-field"
        />
      )}
      <button onClick={handleSubmit} disabled={authStatus === 'loading'}>
        {isRegistering ? 'SIGN UP' : 'SIGN IN'}
      </button>
      {error && <p className="auth-error">{error}</p>}
      <p className="toggle-auth">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span className='authLinks'>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </span>
      </p>
    </div>
  );
}

export default Auth;
