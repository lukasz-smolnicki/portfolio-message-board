import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const ThreadItem = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)
    const loggedUserId = getData('loggedUserId')

    return (
        <>
            <div className='list-group-item'>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-between'>
                        <small className='mb-1 pe-2'><Link className='link' to={`/post/${thread.id}/1`}>{thread.name}</Link></small>
                        <small className='text-muted text-nowrap'>3 days ago</small>
                    </div>
                    <div className='col-12 d-flex justify-content-between'>
                        <small className='text-muted'>Created by: {user.name} in {thread.date}</small>
                        <div>
                            {(loggedUserId === user.id) && <ThreadItemButtons thread={thread} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ThreadItemButtons = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props

    if (isDelete) {
        return (
            <>
                <span>Do you want to delete thread?</span>
                <Button className='btn btn-sm text-danger' handleMethod={() => handleToggle('isDelete', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <Button className='btn btn-sm text-success' handleMethod={() => handleThreadDelete(thread)}><FontAwesomeIcon icon={faCheck} /></Button>
            </>
        )
    } else {
        return (
            <>
                <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isEdit', true)}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isDelete', true)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </>
        )
    }
}

export default ThreadItem