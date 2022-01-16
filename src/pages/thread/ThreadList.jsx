import React from 'react'
import Thread from './Thread'
import { getData, setData } from '../../utils/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
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

    handleListAddToggle = (value) => {
        this.setState({
            threadListAddIsActive: value
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

    handleThreadEdit = (e, thread, name, body) => {
        e.preventDefault()

        const threads = this.state.threads
        const id = thread.id
        const threadIndex = threads.findIndex(thread => thread.id === id)

        threads[threadIndex].name = name
        threads[threadIndex].body = body
        threads[threadIndex].editDate = getFormatedDate()
        setData('threads', threads)
        this.setState({
            threads
        })
    }

    threadList = () => {
        const threads = this.state.threads

        return threads.map(thread => <Thread key={thread.id} thread={thread} handleThreadEdit={this.handleThreadEdit} />)
    }

    render() {
        const threadList = this.threadList()
        const loggedUserId = getData('loggedUserId')

        return (
            <section>
                <ThreadListNav />
                {loggedUserId && <ThreadListAdd
                    handleChange={this.handleChange}
                    handleListAddToggle={this.handleListAddToggle}
                    handleThreadAdd={this.handleThreadAdd}
                    state={this.state} />}
                {threadList}
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
    const { handleChange, handleListAddToggle, handleThreadAdd, state } = props

    if (state.threadListAddIsActive) {
        return (
            <form onSubmit={handleThreadAdd}>
                <input type="text" name="name" value={state.name} placeholder='Enter post title' onChange={handleChange} />
                <input type="text" name="body" value={state.body} placeholder='Enter post body' onChange={handleChange} />
                <Button handleMethod={() => handleListAddToggle(false)}>Cancel</Button>
                <ButtonSubmit>Add Thread</ButtonSubmit>
            </form>
        )
    } else {
        return (
            <Button handleMethod={() => handleListAddToggle(true)}>Add Thread</Button>
        )
    }
}

const ThreadListFooter = () => {
    return (
        <footer>
            <p>ThreadListFooter</p>
        </footer>
    )
}

export default ThreadList