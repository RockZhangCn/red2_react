import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavLinks = () => {

    const user = useSelector(state => state.user);
    console.log("NavLinks avatar is ", user.avatar);
    return (
        <>
            <div className="11" >
                Red2
            </div>
            <div className="22">
                { user.isLoggedIn ? "Welcome" : "Login" }
            </div>

            <div className="33">
                <img src={user.avatar} style={{ display: user.isLoggedIn ? "inline" : "none", 
                    width:'50px', height:'50px', borderRadius: '50%', }}></img>
                { user.isLoggedIn ? user.nickName : "unLogin" }
            </div>
        </>
    )
}

export default NavLinks;
