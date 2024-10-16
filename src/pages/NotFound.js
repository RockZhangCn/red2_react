import NavBar from '../components/Bar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => { 
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NavBar title="Sorry"/>
            <div id='settinglist' style={{border:'solid 1px black', backgroundColor: "#EEE", width:'50%', 
                padding:'10px', marginTop:'30px', marginLeft:'auto', marginRight:'auto'}}>

                <div>Page Not Found.</div>
                <div>3 seconds will navigate to login page.</div>
                <a href="/" onClick={ ()=> navigate("/")}> Go to login </a>
            </div>
        </>
        );
}

export default NotFound;
