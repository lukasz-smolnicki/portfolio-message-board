import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const PostItem = (props) => {
    const { post, isDelete, handleToggle, handlePostDelete } = props
    const users = getData('users')
    const user = users.find(user => user.id === post.userId)
    const loggedUserId = getData('loggedUserId')

    return (
        <>
            <div className='list-group-item'>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-between'>
                        <small className='mb-1 pe-2'>{post.name}</small>
                        <small className='text-muted text-nowrap'>3 days ago</small>
                    </div>
                    <div className='col-12 d-flex justify-content-between'>
                        {post.editDate ?
                            <small className='text-muted'>Edited by: {user.name} in {post.editDate}</small>
                            :
                            <small className='text-muted'>Created by: {user.name} in {post.date}</small>}
                        <div>
                            {(loggedUserId === user.id) && <PostItemButtons post={post} isDelete={isDelete} handleToggle={handleToggle} handlePostDelete={handlePostDelete} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const PostItemButtons = (props) => {
    const { post, isDelete, handleToggle, handlePostDelete } = props

    if (isDelete) {
        return (
            <>
                <span>Do you want to delete post?</span>
                <Button className='btn btn-sm text-danger' handleMethod={() => handleToggle('isDelete', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <Button className='btn btn-sm text-success' handleMethod={() => handlePostDelete(post)}><FontAwesomeIcon icon={faCheck} /></Button>
            </>
        )
    } else {
        return (
            <>
                <div className='text-nowrap'>
                    <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isEdit', true)}><FontAwesomeIcon icon={faEdit} /></Button>
                    <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isDelete', true)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                </div>
            </>
        )
    }
}

export default PostItem