import React from 'react'
import { getData } from '../../utils/dataUtils'

const ThreadItem = (props) => {
    const { thread } = props
    const users = getData('users')
    const user = users.find(user => user.id === thread.userId)

    return (
        <article>
            <ThreadItemAside thread={thread} user={user} />
            <ThreadItemHeader thread={thread} />
            <ThreadItemBody thread={thread} />
            <ThreadItemFooter thread={thread} />
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
    const { thread } = props

    return (
        <footer>
            <p>{thread.date}</p>
        </footer>
    )
}

export default ThreadItem