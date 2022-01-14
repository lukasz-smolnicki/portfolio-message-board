import React from 'react'
import Button from '../components/Button'
import { NavLink } from "react-router-dom"

const Navbar = (props) => {
    const { handleAuth } = props
    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/post'>Post</NavLink></li>
                <li><NavLink to='/signin'>SignIn</NavLink></li>
                <li><NavLink to='/signup'>SignUp</NavLink></li>
                <li><NavLink to='/thread'>Thread</NavLink></li>
                <li><NavLink to='/user'>User</NavLink></li>
            </ul>
            <Button handleMethod={() => handleAuth(false)}>Sing Out</Button>
        </nav>
    )
}

export default Navbar