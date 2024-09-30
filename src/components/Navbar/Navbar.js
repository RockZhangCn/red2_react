import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = ( {title}) => {
    const [top, setTop] = useState(!window.scrollY);
    const user = useSelector(state => state.user);
    // console.log("NavLinks avatar is ", user.avatar);

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <nav>
            <div className="11" >
                Red2
            </div>
            <div className="22">
                {/* { user.isLoggedIn ? "Welcome" : {title} } */}
                {title}
            </div>

            <div className="33">
                <img src={user.avatar} style={{ display: user.isLoggedIn ? "inline" : "none", 
                    width:'50px', height:'50px', borderRadius: '50%', }}></img>
                { user.isLoggedIn ? user.nickName : "unLogin" }
            </div>
        </nav>
    )
}

export default NavBar;
