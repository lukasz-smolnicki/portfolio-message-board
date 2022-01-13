import React from 'react'

const ThreadItem = () => {
    return (
        <article>
            <ThreadItemAside />
            <ThreadItemHeader />
            <ThreadItemBody />
            <ThreadItemFooter />
        </article>
    )
}

const ThreadItemAside = () => {
    return (
        <aside>
            <p>ThreadAside</p>
        </aside>
    )
}

const ThreadItemHeader = () => {
    return (
        <header>
            <p>ThreadHeader</p>
        </header>
    )
}

const ThreadItemBody = () => {
    return (
        <main>
            <p>ThreadBody</p>
        </main>
    )
}

const ThreadItemFooter = () => {
    return (
        <footer>
            <p>ThreadFooter</p>
        </footer>
    )
}

export default ThreadItem