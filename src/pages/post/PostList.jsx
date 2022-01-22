import React from 'react'
import PostItem from './PostItem'

const PostList = () => {
    return (
        <section>
            <PostListNav />
            <PostListAdd />
            <PostItem />
            <PostListFooter />
        </section>
    )
}

const PostListNav = () => {
    return (
        <nav>
            <p>PostListNav</p>
        </nav>
    )
}

const PostListAdd = () => {
    return (
        <form>
            <label>
                PostListAdd
                <input type='text' name='name' />
            </label>
            <input type='submit' value='Wyślij' />
        </form>
    )
}

const PostListFooter = () => {
    return (
        <footer>
            <p>PostListFooter</p>
        </footer>
    )
}

export default PostList