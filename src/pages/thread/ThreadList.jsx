import React from 'react'
import ThreadItem from './ThreadItem'

const ThreadList = () => {
    return (
        <section>
            <ThreadListNav />
            <ThreadListAdd />
            <ThreadItem />
            <ThreadListFooter />
        </section>
    )
}

const ThreadListNav = () => {
    return (
        <nav>
            <p>ThreadListNav</p>
        </nav>
    )
}

const ThreadListAdd = () => {
    return (
        <form>
            <label>
                ThreadListAdd
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Wyślij" />
        </form>
    )
}

const ThreadListFooter = () => {
    return (
        <footer>
            <p>ThreadListFooter</p>
        </footer>
    )
}

export default ThreadList