import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/home/Home'
import PostList from '../pages/post/PostList'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/signup/SignUp'
import ThreadList from '../pages/thread/ThreadList'
import UserList from '../pages/user/UserList'
import NotFound from '../components/NotFound'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<PostList />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/thread" element={<ThreadList />} />
                <Route path="/user" element={<UserList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default Main