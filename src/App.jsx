import { useState } from 'react';
import './App.css';
import PersistentDrawerLeft from './Components/SideBar/SideBar';
import Loader from './Components/Loader/Loader';
import Auth from './Components/Auth/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="Wrapper2">
          <div className="leftContainer">

          </div>
          <div className="rightContainer">
          <Auth onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <>
          <PersistentDrawerLeft />
          <Loader /> 
        </>
      )}
    </div>
  );
}

export default App;
