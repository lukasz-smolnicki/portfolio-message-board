import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="/signin">SignIn</a></li>
                <li><a href="/signup">SignUp</a></li>
                <li><a href="/thread">Thread</a></li>
                <li><a href="/user">User</a></li>
            </ul>
        </nav>
    )
}

export default Navbar