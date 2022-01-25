import React from 'react'
import { getData } from '../utilities/dataUtils'

const Header = (props) => {
    const { isAuth } = props

    return (
        <header className='jumbotron'>
            {isAuth ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
        </header>
    )
}

const HeaderLoggedIn = () => {
    const loggedUserId = getData('loggedUserId')
    const users = getData('users')
    const user = users.find(user => user.id === loggedUserId)

    return (
        <>
            <h1 className='display-4'>Hello, {user.name}!</h1>
            <p className='lead'>This is a simple message forum aplication for my portfolio.</p>
            <p>Now you can add, edit, remove threads and posts. For more info go to section about.</p>
            <hr className='my-4' />
        </>
    )
}

const HeaderLoggedOut = () => {

    return (
        <>
            <h1 className='display-4'>Hello, Board!</h1>
            <p className='lead'>This is a simple message forum aplication for my portfolio.</p>
            <p>Now you should SignIn using login: 'Wookie' password: 'hireme' or create your own account using SignUp tab.</p>
            <hr className='my-4' />
        </>
    )
}

export default Header