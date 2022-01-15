import React from 'react'
import ThreadItem from './ThreadItem'
import { getData, setData } from '../../utils/dataUtils'
import { ButtonSubmit } from '../../components/Button'
import { getFormatedDate } from '../../utils/utils'

class ThreadList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            users: [],
            threadListAddIsActive: false,
            name: '',
            body: ''
        }
    }

    componentDidMount() {
        this.setState({
            threads: getData('threads'),
            users: getData('users')
        })
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    handleResetForm = () => {
        this.setState({
            name: '',
            body: ''
        })
    }

    handleThreadAdd = (e) => {
        e.preventDefault()
        const loggedUserId = getData('loggedUserId')
        const counters = getData('counters')
        const threads = getData('threads')

        if (this.state.name === '' || this.state.body === '') {
            alert('Enter title name and post description')
        } else {
            ++counters.threadId
            const newThread = {
                id: counters.threadId,
                userId: loggedUserId,
                name: this.state.name,
                body: this.state.body,
                date: getFormatedDate()
            }
            threads.push(newThread)
            this.setState({
                threadListAddIsActive: false,
                threads
            })
            setData('threads', threads)
            setData('counters', counters)
        }
        this.handleResetForm()
    }

    threadItemList = () => {
        const threads = this.state.threads

        return threads.map(thread => <ThreadItem key={thread.id} thread={thread} />)
    }

    render() {
        const threadItemList = this.threadItemList()

        return (
            <section>
                <ThreadListNav />
                <ThreadListAdd
                    handleChange={this.handleChange}
                    handleThreadAdd={this.handleThreadAdd}
                    state={this.state} />
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

const ThreadListAdd = (props) => {
    const { handleChange, handleThreadAdd, state } = props

    return (
        <form onSubmit={handleThreadAdd}>
            <label>
                ThreadListAdd
                <input type="text" name="name" value={state.name} placeholder='Enter post title' onChange={handleChange} />
                <input type="text" name="body" value={state.body} placeholder='Enter post body' onChange={handleChange} />
            </label>
            <ButtonSubmit>Add Thread</ButtonSubmit>
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