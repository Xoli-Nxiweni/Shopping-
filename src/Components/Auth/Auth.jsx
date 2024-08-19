import { useState } from 'react';
import './Auth.css';

// Helper functions to interact with local storage
const loadUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// eslint-disable-next-line react/prop-types
function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState(''); // State for repeat password
  const [error, setError] = useState('');

  const handleLogin = () => {
    const users = loadUsers();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(); // Login successful
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = loadUsers();
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError('Username already exists');
      return;
    }

    const newUser = { username, password, lists: [] };
    users.push(newUser);
    saveUsers(users);

    onLogin(); // Automatically log in after registration
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
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
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
      <button onClick={handleSubmit}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      {error && <p className="auth-error">{error}</p>}
      <p className="toggle-auth">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default Auth;
