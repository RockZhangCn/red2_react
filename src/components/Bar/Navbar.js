import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { userLogoutAction } from '../../actions/userActions.js';
import { leaveTheSeatAction} from '../../actions/gameActions.js';
import axios from 'axios'; 
import { generateAvatarPath } from "../../utility/AvatarConvert.js";
import { HTTP_SERVER } from '../../Server/Server.js'

const NavBar = ( {title}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function logout(event) {

        var logOutData = { email: user.userEmail, nickname: user.nickName, avatar:user.avatar,};
        console.log("User logout with data ", logOutData);
        // Send POST request to /logout using Axios
        axios.post(HTTP_SERVER+'/logout', logOutData
            , { withCredentials: true}
        ) // Send user data in the request body
        .then(response => {
            console.log("User logout with received data", response.data);
            if (response.data.success) {
                dispatch(leaveTheSeatAction());
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
                <img src="/logo192.png" style={{height: '7vh',}}/>
            </div>
            <div className="22">
                {title}
            </div>
            <div className="33">
                <img 
                    src={generateAvatarPath(user.avatar)} 
                    style={{ display: user.isLoggedIn ? "inline" : "none", 
                    width:'50px', height:'50px', borderRadius: '50%', }} 
                    onClick={logout}
                ></img>
                <span style={{marginLeft:'8px',}}>
                { user.isLoggedIn ? user.nickName : "Guest" }
                </span>
            </div>
        </nav>
    )
}

export default NavBar;
