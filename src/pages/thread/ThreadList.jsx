import React from 'react'
import Thread from './Thread'
import { getData, setData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
import { getFormatedDate } from '../../utilities/utils'
import { useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import Error from '../../components/Error'
import SortItems from '../../components/SortItems'
import FilterItems from '../../components/FilterItems'
import ShowItemsNumber from '../../components/ShowItemsNumber'

class ThreadList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            users: [],
            threadListAddIsActive: false,
            name: '',
            body: '',
            paginationItemsPerSite: 10,
            sortItemsBy: '1',
            filterSelectValue: '1',
            filterInputValue: ''
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

    handleSortItems = (threads) => {
        const { sortItemsBy } = this.state

        switch (sortItemsBy) {
            case '1':
                threads.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return d - c
                })
                break
            case '2':
                threads.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return c - d
                })
                break
            case '3':
                threads.sort((a, b) => a.name.localeCompare(b.name))
                break
            case '4':
                threads.sort((a, b) => b.name.localeCompare(a.name))
                break
            case '5':
                threads.sort((a, b) => a.body.localeCompare(b.body))
                break
            case '6':
                threads.sort((a, b) => b.body.localeCompare(a.body))
                break
            default:
                threads.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return c - d
                })
        }
    }

    handleFilterItems = (threads, users) => {
        const { filterInputValue, filterSelectValue } = this.state

        if (filterInputValue === '') {
            return threads
        } else {
            let filteredData
            switch (filterSelectValue) {
                case '1':
                    filteredData = threads.filter(thread => thread.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    break
                case '2':
                    filteredData = threads.filter(thread => thread.body.toLowerCase().includes(filterInputValue.toLowerCase()))
                    break
                case '3':
                    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    const filteredUsersIdArrray = filteredUsers.map(filteredUser => filteredUser.id)
                    filteredData = threads.filter(thread => filteredUsersIdArrray.includes(thread.userId))
                    break
                default:
                    filteredData = threads.filter(thread => thread.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    break
            }
            return filteredData
        }
    }

    threadList = () => {
        const { threads, users, paginationItemsPerSite } = this.state
        const { params } = this.props
        this.handleSortItems(threads)
        const filteredData = this.handleFilterItems(threads, users)
        const siteIndex = parseInt(params.site)
        const sitePaginationIndex = siteIndex * paginationItemsPerSite
        const siteOfThreads = filteredData.slice(sitePaginationIndex - paginationItemsPerSite, sitePaginationIndex)
        if (typeof filteredData !== 'undefined' && filteredData.length > 0 && ((filteredData.length / paginationItemsPerSite) + 1) > siteIndex && siteIndex > 0) {
            return siteOfThreads.map(thread => <Thread key={thread.id} isAuth={this.props.isAuth} thread={thread} handleThreadEdit={this.handleThreadEdit} handleThreadDelete={this.handleThreadDelete} />)
        } else {
            return (
                <Error message='Threads not found' />
            )
        }
    }

    render() {
        const threadList = this.threadList()
        const loggedUserId = getData('loggedUserId')
        const params = this.props.params

        return (
            <section>
                <ThreadListNav handleChange={this.handleChange} filterInputValue={this.state.filterInputValue} filterSelectValue={this.state.filterSelectValue} />
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

const ThreadListNav = (props) => {
    const { handleChange, sortItemsBy, filterInputValue, filterSelectValue, showItemsNumber } = props
    const sortOptions = [
        { value: '1', content: 'Sort Newest to Oldest' },
        { value: '2', content: 'Sort Oldest to Newest' },
        { value: '3', content: 'By title, A to Z' },
        { value: '4', content: 'By title, Z to A' },
        { value: '5', content: 'By content, A to Z' },
        { value: '6', content: 'By content, Z to A' }
    ]
    const filterOptions = [
        { value: '1', content: 'By title' },
        { value: '2', content: 'By content' },
        { value: '3', content: 'By author' }
    ]

    const showItemsOptions = [
        { value: '1', content: '5' },
        { value: '2', content: '10' },
        { value: '3', content: '20' }
    ]

    return (
        <nav className='row'>
            <div className='col-sm-2 mb-2'>
                <ShowItemsNumber name='showItemsNumber' value={showItemsNumber} showItemsOptions={showItemsOptions} handleChange={handleChange} />
            </div>
            <div className='col-sm-4 mb-2'>
                <SortItems name='sortItemsBy' value={sortItemsBy} sortOptions={sortOptions} handleChange={handleChange} />
            </div>
            <div className='col-sm-6 mb-2'>
                <FilterItems filterOptions={filterOptions} filterInputName='filterInputValue' filterSelectName='filterSelectValue' filterInputValue={filterInputValue} filterSelectValue={filterSelectValue} handleChange={handleChange} />
            </div>



        </nav>
    )
}

const ThreadListAdd = (props) => {
    const { handleChange, handletThreadAddToggle, handleThreadAdd, state } = props

    if (state.threadListAddIsActive) {
        return (
            <form onSubmit={handleThreadAdd}>
                <input type='text' name='name' value={state.name} placeholder='Enter post title' onChange={handleChange} />
                <input type='text' name='body' value={state.body} placeholder='Enter post body' onChange={handleChange} />
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
        <footer className='d-flex justify-content-center'>
            <Pagination array={threads} route={'/thread/'} site={params.site} paginationItemsPerSite={paginationItemsPerSite} />
        </footer>
    )
}

const ThreadListNavigation = (props) => {
    const params = useParams()

    return <ThreadList {...props} params={params} />
}

export default ThreadListNavigation