import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // {{ edit_1 }}
import { Link } from 'react-router-dom';
import './Navbar.css';
import { userLogoutAction } from '../../actions/userActions';
import axios from 'axios'; // {{ edit_1 }}
import { extractNumber, generateAvatarPath } from "../../utility/AvatarConvert";


const NavBar = ( {title}) => {
    const [top, setTop] = useState(!window.scrollY);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch(); // {{ edit_2 }}

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    function logout(event) {

        var logOutData = { email: user.userEmail, nickname: user.nickName, avatar:user.avatar,};
        console.log("User logout with data ", logOutData);
        // Send POST request to /logout using Axios
        axios.post('http://localhost:5256/logout', logOutData
            , { withCredentials: true}
        ) // Send user data in the request body
            .then(response => {
                console.log("User logout with received data", response.data);
                if (response.data.success) {
                    dispatch(userLogoutAction(user));
                }
            })
            .catch(error => {
                console.error("Logout failed:", error);
            });
    }

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
                <img 
                    src={generateAvatarPath(user.avatar)} 
                    style={{ display: user.isLoggedIn ? "inline" : "none", 
                    width:'50px', height:'50px', borderRadius: '50%', }} 
                    onClick={logout}
                ></img>
                { user.isLoggedIn ? user.nickName : "unLogin" }
            </div>
        </nav>
    )
}

export default NavBar;
