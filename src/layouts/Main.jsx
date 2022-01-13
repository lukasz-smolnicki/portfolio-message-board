import React from 'react'
import Home from '../pages/home/Home'
import PostList from '../pages/post/PostList'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/signup/SignUp'
import ThreadList from '../pages/thread/ThreadList'
import UserList from '../pages/user/UserList'

const Main = () => {
    return (
        <main>
            <Home />
            <SignIn />
            <SignUp />
            <ThreadList />
            <PostList />
            <UserList />
        </main>
    )
}

export default Main