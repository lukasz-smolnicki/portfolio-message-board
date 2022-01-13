import React from 'react'

const PostItem = () => {
    return (
        <article>
            <PostItemAside />
            <PostItemBody />
            <PostItemFooter />
        </article>
    )
}

const PostItemAside = () => {
    return (
        <aside>
            <p>PostAside</p>
        </aside>
    )
}

const PostItemBody = () => {
    return (
        <main>
            <p>PostBody</p>
        </main>
    )
}

const PostItemFooter = () => {
    return (
        <footer>
            <p>PostFooter</p>
        </footer>
    )
}

export default PostItem