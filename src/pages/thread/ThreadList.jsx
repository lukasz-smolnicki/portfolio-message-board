import React from 'react'
import Thread from './Thread'
import { getData, setData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
import { getFormatedDate } from '../../utilities/utils'
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination'

class ThreadList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            users: [],
            threadListAddIsActive: false,
            name: '',
            body: '',
            paginationItemsPerSite: 10
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

    handletThreadAddToggle = (value) => {
        this.setState({
            threadListAddIsActive: value
        })
        this.handleResetForm()
    }

    handleThreadAdd = () => {
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
            this.handleResetForm()
        }
    }

    handleThreadEdit = (thread, name, body) => {
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

    handleThreadDelete = (thread) => {
        const threads = this.state.threads
        const posts = getData('posts')
        const id = thread.id
        const threadsFiltered = threads.filter(thread => thread.id !== id)
        const postsFiltered = posts.filter(post => post.threadId !== id)

        setData('threads', threadsFiltered)
        setData('posts', postsFiltered)
        this.setState({
            threads: threadsFiltered
        })
    }

    threadList = () => {
        const { threads, paginationItemsPerSite } = this.state
        const { params } = this.props
        const sitePaginationIndex = params.site * paginationItemsPerSite
        const sitePagination = threads.slice(sitePaginationIndex - paginationItemsPerSite, sitePaginationIndex)

        return sitePagination.map(thread => <Thread key={thread.id} isAuth={this.props.isAuth} thread={thread} handleThreadEdit={this.handleThreadEdit} handleThreadDelete={this.handleThreadDelete} />)
    }

    render() {
        const threadList = this.threadList()
        const loggedUserId = getData('loggedUserId')
        const params = this.props.params

        return (
            <section>
                <ThreadListNav />
                {loggedUserId && <ThreadListAdd
                    handleChange={this.handleChange}
                    handletThreadAddToggle={this.handletThreadAddToggle}
                    handleThreadAdd={this.handleThreadAdd}
                    state={this.state} />}
                {threadList}
                <ThreadListFooter threads={this.state.threads} params={params} paginationItemsPerSite={this.state.paginationItemsPerSite} />
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
    const { handleChange, handletThreadAddToggle, handleThreadAdd, state } = props

    if (state.threadListAddIsActive) {
        return (
            <form onSubmit={handleThreadAdd}>
                <input type="text" name="name" value={state.name} placeholder='Enter post title' onChange={handleChange} />
                <input type="text" name="body" value={state.body} placeholder='Enter post body' onChange={handleChange} />
                <Button handleMethod={() => handletThreadAddToggle(false)}>Cancel</Button>
                <ButtonSubmit>Add Thread</ButtonSubmit>
            </form>
        )
    } else {
        return (
            <Button handleMethod={() => handletThreadAddToggle(true)}>Add Thread</Button>
        )
    }
}

const ThreadListFooter = (props) => {
    const { params, threads, paginationItemsPerSite } = props

    return (
        <footer>
            <Pagination array={threads} route={'/thread/'} site={params.site} paginationItemsPerSite={paginationItemsPerSite} />
        </footer>
    )
}

const ThreadListNavigation = (props) => {
    const params = useParams()

    return <ThreadList {...props} params={params} />;
}

export default ThreadListNavigation