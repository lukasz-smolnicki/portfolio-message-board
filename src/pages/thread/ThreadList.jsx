import React from 'react'
import ThreadItem from './ThreadItem'
import { getData } from '../../utils/dataUtils'

class ThreadList extends React.Component {
    state = {
        threads: [],
        users: [],
    }

    threadItemList = () => {
        const threads = getData('threads')

        const threadItemList = threads.map(thread => <ThreadItem key={thread.id} thread={thread} />)
        return threadItemList
    }

    render() {
        const threadItemList = this.threadItemList()

        return (
            <section>
                <ThreadListNav />
                <ThreadListAdd />
                {threadItemList}
                <ThreadListFooter />
            </section>
        )
    }
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