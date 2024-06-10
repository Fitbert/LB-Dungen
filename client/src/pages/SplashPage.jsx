import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashPage.css';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import logo1000 from '../images/LD_Logo_1000px.png';
// import './cursor.js'; //p Import cursor.js as a script

export default function SplashPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = cursorScript;
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const handleSignUpClick = async () => {
    // Perform sign-up logic with the username and password
    console.log('Sign Up:', username, password);
    // navigate('/signup');
    const { data } = await addUser({ variables: { username, password } });
    Auth.login(data.addUser.token);
  };

  return (
    <>
    { Auth.loggedIn() ? navigate('/home') : (
    <div className="splash-page">
      <h1>Welcome to</h1>
      <img src={logo1000} alt="logo" className="logo" />

      <h2>About The Language Dungeon</h2>
      <div className="paragraph-container">
        <p>
          <span className="paragraph-text">
            The Language Dungeon is your ultimate destination for language learning and exploration.
            Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.
          </span>
        </p>
      </div>

      <div className="signup-container">
        <h2>Get Started</h2>
        <p>Please create a <b>Username</b> and <b>Password</b> to begin your Language Learning Journey!</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUpClick}>Sign Up Now</button>
      </div>

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
      )}
    </>
  );
}