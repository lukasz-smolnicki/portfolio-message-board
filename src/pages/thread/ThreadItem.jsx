import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'

const ThreadItem = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)

    return (
        <article>
            <ThreadItemAside user={user} />
            <ThreadItemHeader thread={thread} />
            <ThreadItemBody thread={thread} />
            <ThreadItemFooter thread={thread} user={user} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />
        </article>
    )
}

const ThreadItemAside = (props) => {
    const { user } = props

    return (
        <aside>
            <p>{user.name}</p>
        </aside>
    )
}

const ThreadItemHeader = (props) => {
    const { thread } = props

    return (
        <header>
            <p>{thread.name}</p>
        </header>
    )
}

const ThreadItemBody = (props) => {
    const { thread } = props

    return (
        <main>
            <p>{thread.body}</p>
        </main>
    )
}

const ThreadItemFooter = (props) => {
    const { thread, user, isDelete, handleToggle, handleThreadDelete } = props
    const loggedUserId = getData('loggedUserId')

    return (
        < footer >
            <p>{thread.date}</p>
            {(loggedUserId === user.id) && <ThreadItemFooterButtons thread={thread} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />}
        </footer >
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
                <Button handleMethod={() => handleToggle('isEdit', true)}>Edit thread</Button>
                <Button handleMethod={() => handleToggle('isDelete', true)}>Remove thread</Button>
            </>
        )
    }
}

export default ThreadItem