import React from 'react'
import Button from '../components/Button'

const Navbar = (props) => {
    const { handleAuth } = props
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="/signin">SignIn</a></li>
                <li><a href="/signup">SignUp</a></li>
                <li><a href="/thread">Thread</a></li>
                <li><a href="/user">User</a></li>
            </ul>
            <Button handleMethod={() => handleAuth(false)}>Sing Out</Button>
        </nav>
    )
}

export default Navbar