import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import About from '../pages/About'
import Home from '../pages/Home'
import PostList from '../pages/post/PostList'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ThreadList from '../pages/thread/ThreadList'
import UserList from '../pages/user/UserList'
import Error from '../components/Error'
import { ProtectedLogin } from '../utilities/protectedRouts'

const Main = (props) => {
    const { isAuth, handleAuth } = props

    return (
        <main>
            <Routes>
                <Route path="/" element={<Navigate to={`/thread/1`} />} />
                <Route path="/about" element={<About />} />
                <Route path="/post" element={<PostList />} />
                <Route element={<ProtectedLogin isAuth={isAuth} />} >
                    <Route path="/signin" element={<SignIn handleAuth={handleAuth} />} />
                    <Route path="/signup" element={<SignUp handleAuth={handleAuth} />} />
                </Route>
                <Route path="/thread/:site" element={<ThreadList isAuth={isAuth} />} />
                <Route path="/user" element={<UserList />} />
                <Route path="*" element={<Error message='Page not found' />} />
            </Routes>
        </main>
    )
}

export default Main