import NavBar from '../components/Navbar/Navbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLoginAction } from '../actions/userActions';
import Dashboard from '../components/Dashboard.js'; // Import the Dashboard component

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
        console.log("We have submitted the form");
        console.log(email, password);
        const formData = new FormData(event.target); // 获取表单数据
    
        // 模拟后端验证（实际应替换为 API 请求）
        const fakeLogin = new Promise((resolve, reject) => {
          setTimeout(() => {
            // if (formData.get('username') === 'user' && formData.get('password') === 'pass') {
              resolve('success');
            //   reject('Invalid credentials');
            // } else {
            //   reject('Invalid credentials');
            // }
          }, 1000);
        });
    
        try {
          await fakeLogin; // 如果登录成功
         
          console.log("We begin to dispatcd event email ", email);
          dispatch(userLoginAction({"useremail": email, "nickname": 'rockzhang', "avatar":"/avatar/icon_7.png"}));

          setError('');
        } catch (err) {
          setError(err); // 如果登录失败，显示错误信息
        } finally {
          setLoading(false); // 结束加载
        }
      };
    
      // 如果已登录，显示登录成功后的页面
      if (user.isLoggedIn) {
        return (
        <>
            <NavBar/>
            <Dashboard />
        </>
        );
      } else {
        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                                <h2 className="text-center mb-4">Please Login</h2>
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
            </>
        );
      }


    
}

export default Home;