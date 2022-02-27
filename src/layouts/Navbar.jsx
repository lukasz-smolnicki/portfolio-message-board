import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { removeData, setData, getData } from '../utilities/dataUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
    const { isAuth, handleAuth } = props

    return (
        <nav className='navbar navbar-expand-sm sticky-top navbar-light bg-danger'>
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
    const loggedUserId = getData('loggedUserId')
    const users = getData('users')
    const user = users.find(user => user.id === loggedUserId)


    return (
        <>
            <li className='nav-item'><NavLink className='nav-link' to='/about'>About</NavLink></li>
            <li className='nav-item dropdown'>
                <Link className='nav-link dropdown-toggle' to='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    <FontAwesomeIcon icon={faUser} /> {user.name}
                </Link>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li className='dropdown-item'><NavLink className='nav-link' to='/user'>Profile</NavLink></li>
                    <li className='dropdown-item'><Link className='nav-link' to='#' onClick={() => {
                        handleAuth(false)
                        removeData('loggedUserId')
                        setData('isAuth', false)
                    }}>Sign Out</Link></li>
                </ul>
            </li>
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