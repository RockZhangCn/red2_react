import NavBar from '../components/Bar/Navbar.js';
import Footer from '../components/Bar/Footer.js'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import { userLoginAction } from '../actions/userActions';
import Dashboard from '../components/Dashboard.js'; // Import the Dashboard component
import { HTTP_SERVER } from '../Server/Server.js'

function Home() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const user = useSelector(state => state.user);

    const [error, setError] = useState(''); // 错误信息
    const [loading, setLoading] = useState(false); // 加载状态

    const handleSubmit = async (event) => {
        event.preventDefault(); // 阻止默认表单提交行为
        setLoading(true); // 开始加载

        try {
            const response = await axios.post(HTTP_SERVER + '/login', {
                email,
                password
            }, { withCredentials: true}); // Send POST request with email and password

            console.log("We begin to dispatch event email ", email);
            if (response.data.success) {
                dispatch(userLoginAction({
                    "success": response.data.success,
                    "message": response.data.message,
                    "useremail": response.data.email, // Adjust based on your API response
                    "nickname": response.data.nickname, // Adjust based on your API response
                    "avatar": response.data.avatar // Adjust based on your API response
                }));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Login failed'); // Handle error
        } finally {
            setLoading(false); // 结束加载
        }
    };
    
    if (user.isLoggedIn) {
        return (
        <>
            <NavBar title="Welcome"/>
            <Dashboard />
        </>
        );
    } else {
        return (
            <>
                <NavBar title="Please login"/>
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                        
                                {loading && (
                                    <div className="progress mb-3" style={{ height: '8px' }}> 
                                        <div 
                                            className="progress-bar progress-bar-striped progress-bar-animated" 
                                            role="progressbar" 
                                            aria-valuenow="100" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100" 
                                            style={{ width: '100%', height: '100%' }} // Set progress bar height to 100%
                                        ></div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="on"
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <Link to="/resetpassword" className="btn btn-warning">Forgot Password</Link>
                                
                                    <Link to="/register" className="btn btn-success">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Home;