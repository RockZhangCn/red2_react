
import NavBar from '../components/Bar/Navbar';
import { useEffect, useState } from 'react';
import { HTTP_SERVER } from "../Server/Server.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userLogoutAction } from '../actions/userActions.js';
import { leaveTheSeatAction} from '../actions/gameActions.js';
import { useSelector, useDispatch } from 'react-redux';

function Setting() {
    const [profileData, setProfileData] = useState({});
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        
        axios.get(HTTP_SERVER+'/profile', { withCredentials: true}
        ) // Send user data in the request body
        .then(response => {
            console.log("User profile received data", response.data);
            if (response.data.success) {
                setProfileData(response.data.data);
            }
        })
        .catch(error => {
            console.error("View user profile failed:", error);
        });
        
    }, []);

    const handleLogout = () => {
        // Logic for logging out the user
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
    
    };

    if (user.isLoggedIn) {
        return (
        <>
            <NavBar title="Welcome"/>
            <div id='settinglist' style={{border:'solid 1px black', backgroundColor: "#EEE", width:'50%', 
                padding:'10px', marginTop:'30px', marginLeft:'auto', marginRight:'auto'}}>
                
                {Object.entries(profileData).map(([key, value]) => (
                    <div key={key} style={{margin:'8px'}}>
                        <strong>{key}:</strong> {value}
                    </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
        );
    } else {
        navigate("/");
    }
}

export default Setting;
