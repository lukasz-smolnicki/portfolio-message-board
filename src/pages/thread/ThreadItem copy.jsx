import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const ThreadItem = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)
    const loggedUserId = getData('loggedUserId')

    return (
        <>
            <NavLink to='/' className="list-group-item list-group-item-action">
                <div className="row">
                    <div className='d-flex justify-content-center align-items-center col-2'>
                        <ThreadItemAside user={user} />
                    </div>
                    <div className='d-flex align-items-center col-7'>
                        <ThreadItemBody thread={thread} />
                    </div>


                </div>
                <div className='row'>
                    <div className="col-10">
                        <ThreadItemFooter thread={thread} user={user} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />
                    </div>
                    <div className='d-flex align-items-center col-2'>
                        {(loggedUserId === user.id) && <ThreadItemFooterButtons thread={thread} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />}
                    </div>
                </div>
            </NavLink>
        </>
    )
}

const ThreadItemAside = (props) => {
    const { user } = props

    return (
        <>
            <NavLink className='nav-link' to='/'>{user.name}</NavLink>
        </>
    )
}

const ThreadItemBody = (props) => {
    const { thread } = props

    return (
        <>
            <small>{thread.name}</small>
        </>
    )
}

const ThreadItemFooter = (props) => {
    const { thread } = props

    return (
        <>
            <small>Last post: {thread.date}</small>
        </>
    )
}

const ThreadItemFooterButtons = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props

    if (isDelete) {
        return (
            <>
                <Button handleMethod={() => handleToggle('isDelete', false)}>Cancel</Button>
                <Button handleMethod={() => handleThreadDelete(thread)}>Apply</Button>
            </>
        )
    } else {
        return (
            <>
                <Button className='btn' handleMethod={() => handleToggle('isEdit', true)}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className='btn' handleMethod={() => handleToggle('isDelete', true)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </>
        )
    }
}

export default ThreadItem