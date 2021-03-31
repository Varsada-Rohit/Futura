import React, { useState } from 'react';
import style from './Home.module.css';

import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import Profile from '../../components/Profile/Profile';
const Home = ({ user, setUser }) => {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className={style.Home}>
            <header>
                <img src="../../../images/sea-img.png" alt="sea-img" />
            </header>
            {user === '' ? (
                isSignup ? (
                    <Signup setUser={setUser} setIsSignup={setIsSignup} />
                ) : (
                    <Login setUser={setUser} setIsSignup={setIsSignup} />
                )
            ) : (
                <Profile user={user} />
            )}
        </div>
    );
};

export default Home;
