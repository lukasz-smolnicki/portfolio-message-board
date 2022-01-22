import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'

const ThreadItemEdit = (props) => {
    const { thread, isDelete, name, body, handleToggle, handleChange, handleThreadEdit } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)

    return (
        <article>
            <ThreadItemEditAside user={user} />
            <form onSubmit={() => {
                handleThreadEdit(thread, name, body)
                handleToggle('isEdit', false)
            }}>
                <ThreadItemEditHeader thread={thread} name={name} handleChange={handleChange} />
                <ThreadItemEditBody thread={thread} body={body} handleChange={handleChange} />
                <ThreadItemEditFooter thread={thread} user={user} isDelete={isDelete} handleToggle={handleToggle} />
            </form>
        </article>
    )
}

const ThreadItemEditAside = (props) => {
    const { user } = props

    return (
        <aside>
            <p>{user.name}</p>
        </aside>
    )
}

const ThreadItemEditHeader = (props) => {
    const { name, handleChange } = props

    return (
        <header>
            <label>
                Name:
                <input type='text' name='name' value={name} placeholder='Enter name' onChange={handleChange} />
            </label>
        </header>
    )
}

const ThreadItemEditBody = (props) => {
    const { body, handleChange } = props

    return (
        <main>
            <label>
                Body:
                <input type='text' name='body' value={body} placeholder='Enter body' onChange={handleChange} />
            </label>
        </main>
    )
}

const ThreadItemEditFooter = (props) => {
    const { thread, user, isDelete, handleToggle } = props
    const loggedUserId = getData('loggedUserId')

    return (
        < footer >
            <p>{thread.date}</p>
            {(loggedUserId === user.id) && <ThreadItemFooterButtons isDelete={isDelete} handleToggle={handleToggle} />}
        </footer >
    )
}

const ThreadItemFooterButtons = (props) => {
    const { handleToggle } = props

    return (
        <>
            <Button handleMethod={() => handleToggle('isEdit', false)}>Cancel</Button>
            <ButtonSubmit>Apply</ButtonSubmit>
        </>
    )
}

export default ThreadItemEdit