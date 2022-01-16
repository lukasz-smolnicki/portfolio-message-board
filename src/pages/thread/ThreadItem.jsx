import React from 'react'
import { getData } from '../../utils/dataUtils'
import { Button } from '../../components/Button'

const ThreadItem = (props) => {
    const { thread, isDelete, handleToggle } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)

    return (
        <article>
            <ThreadItemAside user={user} />
            <ThreadItemHeader thread={thread} />
            <ThreadItemBody thread={thread} />
            <ThreadItemFooter thread={thread} user={user} isDelete={isDelete} handleToggle={handleToggle} />
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
    const { isDelete, handleToggle } = props

    if (isDelete) {
        return (
            <>
                <Button handleMethod={() => handleToggle('isDelete', false)}>Cancel</Button>
                <Button handleMethod={true}>Apply</Button>
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