import React from 'react'

const Header = (props) => {
    const { isAuth } = props

    return isAuth ? <HeaderLoggedIn /> : <HeaderLoggedOut />
}

const HeaderLoggedIn = () => {
    return (
        <header>
            <p>HeaderLoggedIn</p>
        </header>

    )
}

const HeaderLoggedOut = () => {
    return (
        <header>
            <p>HeaderLoggedOut</p>
        </header>
    )
}

export default Header