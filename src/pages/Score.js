import { useSelector } from 'react-redux';
import NavBar from '../components/Bar/Navbar';
import { useEffect, useState } from 'react';
import { HTTP_SERVER } from "../Server/Server.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Bar/Footer';
function Score() {

    const user = useSelector(state => state.user);
    const [scoreData, setScoreData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.isLoggedIn) { 
            axios.get(HTTP_SERVER+'/scores', { withCredentials: true}
            ) // Send user data in the request body
            .then(response => {
                console.log("User score board received data", response.data);
                if (response.data.success) {
                    setScoreData(response.data.data);
                }
            })
            .catch(error => {
                console.error("View score board failed:", error);
            });
        } else {
            const timer = setTimeout(() => {
                navigate("/");
            }, 3000);
            return () => clearTimeout(timer);
        }
        
    }, []);


    if (user.isLoggedIn) {
        return (
        <>
            <NavBar title="Welcome"/>
            <br></br>
            <h2 style={{textAlign: 'center'}}>ScoreBoard</h2>
            <table style={{margin: 'auto', textAlign: 'left', border: '1px solid black', borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{backgroundColor: 'darkgray', border: '1px solid black', padding: '10px'}}>Email</th>
                        <th style={{backgroundColor: 'darkgray', border: '1px solid black', padding: '10px'}}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {scoreData.map((item, index) => (

                    <tr key={index} style={{border: '1px solid black'}}>
                        <td style={{border: '1px solid black',padding: '10px'}}>{item.email}</td>
                        <td style={{border: '1px solid black',padding: '10px'}}>{item.score}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            <Footer/>
        </>
        );
    } else {
        return (
            <>
                <NavBar title="Welcome"/>
                <div id='settinglist' style={{border:'solid 1px black', backgroundColor: "#EEE", width:'50%', 
                    padding:'10px', marginTop:'30px', marginLeft:'auto', marginRight:'auto'}}>

                    <div>Denied, unauthorized access.</div>
                    <div>3 seconds will navigate to login page.</div>
                    <a href="/" onClick={ ()=> navigate("/")}> Go to login </a>
                </div>
                <Footer/>
            </>
            );
    }
}

export default Score;
