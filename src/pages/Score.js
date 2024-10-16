import { useSelector } from 'react-redux';
import NavBar from '../components/Bar/Navbar';
import { useEffect, useState } from 'react';
import { HTTP_SERVER } from "../Server/Server.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Score() {

    const user = useSelector(state => state.user);
    const [scoreData, setScoreData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        
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
            <div style={{margin:'auto', textAlign:'center'}}> 
            {/* ... existing code ... */}
            </div>
        </>
        );
    } else {
        navigate("/");
    }
}

export default Score;
