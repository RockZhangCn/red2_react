import NavBar from '../components/Navbar/Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Add this import

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [avatar, setAvatar] = useState('');

    const avatars = Array.from({ length: 24 }, (_, i) => `/avatar/icon_${i + 1}.png`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        try {
            console.log("We begin to register user", email, " password", password, "nickname", nickname,
                "avatar", avatar);
            const response = await axios.post('http://localhost:5256/register', {
                email,
                password,
                nickname,
                avatar,
            });
            console.log('Registration successful, client received', response.data);
            // Handle successful registration (e.g., redirect or show a success message)
        } catch (error) {
            console.error('Registration failed', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <>
            <NavBar title={"Register"} />
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="p-4 border rounded shadow" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                            {/* <h2 className="text-center mb-4">Register</h2> */}
                            
                            <div className="mb-3">
                                <label htmlFor="nickname" className="form-label">Nickname (for in-game display)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nickname"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    required
                                />
                            </div>
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
                                    minLength={8}
                                />
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    style={{"marginTop":'10px'}}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (e.target.value !== password) {
                                            setPasswordError('Passwords do not match');
                                        } else {
                                            setPasswordError('');
                                        }
                                    }}
                                    required
                                />
                                {passwordError && <div className="text-danger">{passwordError}</div>}
                                <small className="form-text text-muted">Password must be at least 8 characters long.</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Select Avatar</label>
                                <div className="mt-2">
                                    {avatars.map((avatarPath) => (
                                        <img 
                                            key={avatarPath} 
                                            src={avatarPath} 
                                            onClick={() => setAvatar(avatarPath)} // Update to set the selected avatar
                                            style={{ margin: '2px', display: 'inline', width: '50px', height: '50px', cursor: 'pointer',
                                                border: `${avatar === avatarPath ? 2 : 0}px solid blue`,
                                             }} 
                                            alt={`Avatar ${avatarPath.split('_')[1].split('.')[0]}`} 
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Register</button>
                                <Link to="/" className="btn btn-secondary">Already have an account? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;