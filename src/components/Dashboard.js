import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react'; 


function Dashboard () {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.nickName}!</p>
        </div>
    );

};

export default Dashboard;