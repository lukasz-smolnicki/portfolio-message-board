import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const PostItemEdit = (props) => {
    const { post, isDelete, name, handleToggle, handleChange, handlePostEdit } = props
    const users = getData('users')
    const user = users.find(user => user.id === post.userId)
    const loggedUserId = getData('loggedUserId')

    return (
        <>
            <article>
                <form className='card mb-2' onSubmit={() => {
                    handlePostEdit(post, name)
                    handleToggle('isEdit', false)
                }}>
                    <div className='card-body'>
                        <PostItemEditBody post={post} name={name} handleChange={handleChange} />
                    </div>
                    <div className='card-footer d-flex justify-content-end'>
                        {(loggedUserId === user.id) && <PostItemEditButtons isDelete={isDelete} handleToggle={handleToggle} />}
                    </div>
                </form>
            </article>
        </>
    )
}

const PostItemEditBody = (props) => {
    const { name, handleChange } = props

    return (
        <>
            <input className='form-control' type='text' name='name' value={name} placeholder='Title' onChange={handleChange} />
        </>
    )
}

const PostItemEditButtons = (props) => {
    const { handleToggle } = props

    return (
        <>
            <div>
                <span>Do you want save changes?</span>
                <Button className='btn btn-sm text-danger me-2' handleMethod={() => handleToggle('isEdit', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <ButtonSubmit className='btn btn-sm text-success' ><FontAwesomeIcon icon={faCheck} /></ButtonSubmit>
            </div>
        </>
    )
}

export default PostItemEdit