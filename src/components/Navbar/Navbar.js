import React, { useState, useEffect } from 'react';
import './Navbar.css';
import NavLinks from './NavLinks.js';


const NavBar = () => {
    const [top, setTop] = useState(!window.scrollY);
 
    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <nav>
            <NavLinks/>
        </nav>
    )
}

export default NavBar;
