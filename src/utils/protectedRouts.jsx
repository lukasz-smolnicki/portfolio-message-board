import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLogin = (props) => {
    const { isAuth } = props
    console.log(isAuth)

    return isAuth ? <Navigate to={`/`} /> : <Outlet />
}

const ProtectedProfile = (props) => {
    const { loggedUserId } = props.state

    return loggedUserId ? <Outlet /> : <Navigate to='/signin' />
}

export { ProtectedLogin, ProtectedProfile }