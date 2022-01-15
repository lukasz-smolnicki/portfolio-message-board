import React from 'react'

const Header = (props) => {
    const { isAuth } = props

    return (
        <header>
            {isAuth ? <HeaderLoggetIn /> : <HeaderLoggetOut />}
        </header>
    )
}

const HeaderLoggetIn = () => {
    return (
        <p>HeaderLoggedIn</p>
    )
}

const HeaderLoggetOut = () => {
    return (
        <p>HeaderLoggedOut</p>
    )
}

export default Header