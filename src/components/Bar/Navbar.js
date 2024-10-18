import { useSelector } from 'react-redux';
import './Navbar.css';

import { useNavigate } from "react-router-dom";
import { generateAvatarPath } from "../../utility/AvatarConvert.js";


const NavBar = ( {title}) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    function showScoreBoard() {
        navigate("/scores");
    }

    return (
        <nav>
            <div className="11" >
                <img src="/logo192.png" style={{height: '7vh',}} onClick={ ()=> {navigate("/scores");}}/>
            </div>
            <div className="22">
                {title}
            </div>
            <div className="33" style={{height:'100%'}}>
                <span style={{marginRight:'18px', border:'solid 1px white', display: user.isLoggedIn ? "inline" : "none", padding:'3px', fontSize:'1rem'}} onClick={ showScoreBoard}>
                Score Range
                </span>

                <div style={{height:'100%',display:'inline',}} onClick={()=> {navigate("/setting")}}>
                    <img 
                        src={generateAvatarPath(user.avatar)} 
                        style={{ display: user.isLoggedIn ? "inline" : "none", 
                        width:'50px', height:'50px', borderRadius: '50%', }} 
                
                    ></img>
                    <span style={{marginLeft:'8px',}}>
                    { user.isLoggedIn ? user.nickName : "Guest" }
                    </span>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;
