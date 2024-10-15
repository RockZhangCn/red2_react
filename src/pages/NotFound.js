import { useSelector } from 'react-redux';
import NavBar from '../components/Bar/Navbar';

function NotFound(width, height) {

    const user = useSelector(state => state.user);

    if (user.isLoggedIn) {
        return (
        <>
            <NavBar title="Welcome"/>
            <br></br>
            <h1> Page Not Found.</h1>
        </>
        );
    } else {
        return (
            <>
                <NavBar title="Please Login"/>
                <br></br>
                <h1 style={{margin:'auto', textAlign:'center'}}> Page Not Found.</h1>
            </>);
    }
}

export default NotFound;
