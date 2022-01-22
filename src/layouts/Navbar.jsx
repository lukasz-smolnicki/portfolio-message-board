import React from 'react'
import { Button } from '../components/Button'
import { NavLink } from 'react-router-dom'
import { removeData, setData } from '../utilities/dataUtils'

const Navbar = (props) => {
    const { isAuth, handleAuth } = props

    return (
        <nav className='navbar navbar-expand-sm sticky-top navbar-light bg-white'>
            <div className='container'>
                <NavLink className='navbar-brand' to='/thread/1'>Board</NavLink>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        {isAuth ? <NavbarSignedIn handleAuth={handleAuth} /> : <NavbarSignedOut />}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const NavbarSignedIn = (props) => {
    const { handleAuth } = props

    return (
        <>
            <li className='nav-item'><NavLink className='nav-link' to='/about'>About</NavLink></li>
            <li className='nav-item'><NavLink className='nav-link' to='/user'>Profile</NavLink></li>
            <Button className='btn btn-secondary' handleMethod={() => {
                handleAuth(false)
                removeData('loggedUserId')
                setData('isAuth', false)
            }}>Sign Out</Button>
        </>
    )
}

const NavbarSignedOut = () => {
    return (
        <>
            <li className='nav-item'><NavLink className='nav-link' to='/about'>About</NavLink></li>
            <li className='nav-item'><NavLink className='nav-link' to='/signin'>SignIn</NavLink></li>
            <li className='nav-item'><NavLink className='nav-link' to='/signup'>SignUp</NavLink></li>
        </>
    )
}

export default Navbar