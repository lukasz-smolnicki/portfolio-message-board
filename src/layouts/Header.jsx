import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    const { isAuth } = props

    return (
        <header className="jumbotron">
            {isAuth ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
        </header>
    )
}

const HeaderLoggedIn = () => {
    return (
        <>
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>Now you should SignIn using login: 'Wookie' password: 'hireme' or create your own account using SignUp tab.</p>
            <p className="lead">

                <NavLink className="btn btn-primary btn-lg" to='' role="button">Sign In</NavLink>
            </p>
        </>
    )
}

const HeaderLoggedOut = () => {
    return (
        <>
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple message board aplication for my portfolio.</p>
            <hr className="my-4" />
            <p>Now you should SignIn using login: 'Wookie' password: 'hireme' or create your own account using SignUp tab.</p>
            <p className="lead">
                <NavLink className="btn btn-primary btn-lg" to='/signin' role="button">Sign In</NavLink>
            </p>
        </>
    )
}

export default Header