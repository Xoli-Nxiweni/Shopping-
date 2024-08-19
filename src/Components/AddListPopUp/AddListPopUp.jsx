import { useState } from 'react';


// eslint-disable-next-line react/prop-types
function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        onLogin(); // Login successful
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Failed to log in', err);
    }
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Check if the username already exists
      const checkResponse = await fetch(`http://localhost:5000/users?username=${username}`);
      const checkData = await checkResponse.json();

      if (checkData.length > 0) {
        setError('Username already exists');
        return;
      }

      // Proceed with registration
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onLogin(); // Registration successful, log in the user
      } else {
        setError('Failed to register');
      }
    } catch (err) {
      setError('Failed to register', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className="auth-error">{error}</p>}
      <div className="auth-form">
        <div className="auth-field">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="auth-field">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {isRegistering && (
          <div className="auth-field">
            <label>Repeat Password</label>
            <input 
              type="password" 
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)} 
            />
          </div>
        )}
        <button onClick={isRegistering ? handleRegister : handleLogin}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
