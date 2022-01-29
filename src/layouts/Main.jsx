import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import About from '../pages/About'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import UserList from '../pages/user/UserList'
import Error from '../components/Error'
import { ProtectedLogin } from '../utilities/protectedRouts'
import ThreadListNavigation from '../pages/thread/ThreadList'
import PostListNavigation from '../pages/post/PostList'

const Main = (props) => {
    const { isAuth, handleAuth } = props

    return (
        <main>
            <Routes>
                <Route path='/' element={<Navigate to={`/thread/1`} />} />
                <Route path='/about' element={<About />} />
                <Route path='/post/:thread/:site' element={<PostListNavigation />} />
                <Route element={<ProtectedLogin isAuth={isAuth} />} >
                    <Route path='/signin' element={<SignIn handleAuth={handleAuth} />} />
                    <Route path='/signup' element={<SignUp handleAuth={handleAuth} />} />
                </Route>
                <Route path='/thread/:site' element={<ThreadListNavigation isAuth={isAuth} />} />
                <Route path='/user' element={<UserList />} />
                <Route path='*' element={<Error message='Page not found' />} />
            </Routes>
        </main>
    )
}

export default Main