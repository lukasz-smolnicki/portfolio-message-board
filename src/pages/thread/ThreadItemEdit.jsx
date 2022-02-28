import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const ThreadItemEdit = (props) => {
    const { thread, isDelete, name, body, handleToggle, handleChange, handleThreadEdit } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)
    const loggedUserId = getData('loggedUserId')

    return (
        <>
            <article>
                <form className='card mb-2' onSubmit={() => {
                    handleThreadEdit(thread, name, body)
                    handleToggle('isEdit', false)
                }}>
                    <div className='card-header'>
                        <ThreadItemEditHeader thread={thread} name={name} handleChange={handleChange} />
                    </div>
                    <div className='card-body'>
                        <ThreadItemEditBody thread={thread} body={body} handleChange={handleChange} />
                    </div>
                    <div className='card-footer d-flex justify-content-end'>
                        {(loggedUserId === user.id) && <ThreadItemEditButtons isDelete={isDelete} handleToggle={handleToggle} />}
                    </div>
                </form>
            </article>
        </>
    )
}

const ThreadItemEditHeader = (props) => {
    const { name, handleChange } = props

    return (
        <>
            <input className='form-control' type='text' name='name' value={name} placeholder='Title' onChange={handleChange} />
        </>
    )
}

const ThreadItemEditBody = (props) => {
    const { body, handleChange } = props

    return (
        <>
            <textarea className='form-control' type='text' name='body' value={body} placeholder='Message' onChange={handleChange} />
        </>
    )
}

const ThreadItemEditButtons = (props) => {
    const { handleToggle } = props

    return (
        <>
            <div>
                <span>Do you want to save changes?</span>
                <Button className='btn btn-sm text-danger me-2' handleMethod={() => handleToggle('isEdit', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <ButtonSubmit className='btn btn-sm text-success' ><FontAwesomeIcon icon={faCheck} /></ButtonSubmit>
            </div>
        </>
    )
}

export default ThreadItemEdit