import React from 'react'
import { Routes, Route } from "react-router-dom"
import About from '../pages/about/About'
import Home from '../pages/home/Home'
import PostList from '../pages/post/PostList'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/signup/SignUp'
import ThreadList from '../pages/thread/ThreadList'
import UserList from '../pages/user/UserList'
import NotFound from '../components/NotFound'
import { ProtectedLogin } from '../utils/protectedRouts'

const Main = (props) => {
    const { isAuth, handleAuth } = props

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/post" element={<PostList />} />
                <Route element={<ProtectedLogin isAuth={isAuth} />} >
                    <Route path="/signin" element={<SignIn handleAuth={handleAuth} />} />
                    <Route path="/signup" element={<SignUp handleAuth={handleAuth} />} />
                </Route>
                <Route path="/thread" element={<ThreadList isAuth={isAuth} />} />
                <Route path="/user" element={<UserList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default Main