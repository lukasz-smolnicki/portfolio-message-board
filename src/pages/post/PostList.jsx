import React from 'react'
import { useParams } from 'react-router-dom'
import { getData, setData } from '../../utilities/dataUtils'
import Post from './Post'
import PostListHeader from './PostListHeader'
import Error from '../../components/Error'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import { Button, ButtonSubmit } from '../../components/Button'
import { getFormatedDate } from '../../utilities/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            users: [],
            posts: [],
            paginationItemsPerSite: 10,
            sortItemsBy: '1',
            filterSelectValue: '1',
            filterInputValue: '',
            postListAddIsActive: false,
            name: ''
        }
    }

    componentDidMount() {
        this.setState({
            threads: getData('threads'),
            users: getData('users'),
            posts: getData('posts')
        })
    }

    handleResetForm = () => {
        this.setState({
            name: ''
        })
    }

    handlePostAddToggle = (value) => {
        this.setState({
            postListAddIsActive: value
        })
        this.handleResetForm()
    }

    handlePostAdd = (e) => {
        e.preventDefault()
        const loggedUserId = getData('loggedUserId')
        const counters = getData('counters')
        const posts = getData('posts')
        const thread = parseInt(this.props.params.thread)

        if (this.state.name === '') {
            alert('Enter messege')
        } else {
            ++counters.postId
            const newPost = {
                id: counters.postId,
                threadId: thread,
                userId: loggedUserId,
                name: this.state.name,
                date: getFormatedDate()
            }
            posts.push(newPost)
            this.setState({
                postListAddIsActive: false,
                posts
            })
            setData('posts', posts)
            setData('counters', counters)
            this.handleResetForm()
        }
    }

    handlePostEdit = (post, name) => {
        const posts = this.state.posts
        const id = post.id
        const postIndex = posts.findIndex(post => post.id === id)

        posts[postIndex].name = name
        posts[postIndex].editDate = getFormatedDate()
        setData('posts', posts)
        this.setState({
            posts
        })
    }

    handlePostDelete = (post) => {
        const posts = this.state.posts
        const id = post.id
        const postsFiltered = posts.filter(post => post.id !== id)

        setData('posts', postsFiltered)
        this.setState({
            posts: postsFiltered
        })
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handleSortItems = (posts) => {
        const { sortItemsBy } = this.state

        switch (sortItemsBy) {
            case '1':
                posts.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return d - c
                })
                break
            case '2':
                posts.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return c - d
                })
                break
            case '3':
                posts.sort((a, b) => a.name.localeCompare(b.name))
                break
            case '4':
                posts.sort((a, b) => b.name.localeCompare(a.name))
                break
            default:
                posts.sort((a, b) => {
                    const c = new Date(a.date)
                    const d = new Date(b.date)
                    return c - d
                })
        }
    }

    handleFilterItems = (posts, users) => {
        const { filterInputValue, filterSelectValue } = this.state

        if (filterInputValue === '') {
            return posts
        } else {
            let filteredData
            switch (filterSelectValue) {
                case '1':
                    filteredData = posts.filter(post => post.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    break
                case '2':
                    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    const filteredUsersIdArrray = filteredUsers.map(filteredUser => filteredUser.id)
                    filteredData = posts.filter(post => filteredUsersIdArrray.includes(post.userId))
                    break
                default:
                    filteredData = posts.filter(post => post.name.toLowerCase().includes(filterInputValue.toLowerCase()))
                    break
            }
            return filteredData
        }
    }

    postList = () => {
        const { users, paginationItemsPerSite } = this.state
        let { posts } = this.state
        const { params } = this.props
        posts = posts.filter(post => post.threadId === parseInt(params.thread))
        this.handleSortItems(posts)
        const filteredData = this.handleFilterItems(posts, users)
        setData('filteredData', filteredData)
        const siteIndex = parseInt(params.site)
        const sitePaginationIndex = siteIndex * paginationItemsPerSite
        const siteOfPosts = filteredData.slice(sitePaginationIndex - paginationItemsPerSite, sitePaginationIndex)
        if (typeof filteredData !== 'undefined' && filteredData.length > 0 && ((filteredData.length / paginationItemsPerSite) + 1) > siteIndex && siteIndex > 0) {
            return siteOfPosts.map(post => <Post key={post.id} post={post} handlePostDelete={this.handlePostDelete} handlePostEdit={this.handlePostEdit} isAuth={this.props.isAuth} />)
        } else {
            return (
                <Error message='Posts not found' />
            )
        }
    }

    render() {
        const postList = this.postList()
        const params = this.props.params
        const loggedUserId = getData('loggedUserId')

        return (
            <section>
                <PostListNav handleChange={this.handleChange} filterInputValue={this.state.filterInputValue} filterSelectValue={this.state.filterSelectValue} paginationItemsPerSite={this.state.paginationItemsPerSite} />
                {loggedUserId && <PostListAdd
                    handleChange={this.handleChange}
                    handlePostAddToggle={this.handlePostAddToggle}
                    handlePostAdd={this.handlePostAdd}
                    state={this.state} />}
                <PostListHeader params={params} />
                <div className='mb-2'>
                    {postList}
                </div>
                <PostListFooter params={params} paginationItemsPerSite={this.state.paginationItemsPerSite} />
            </section>
        )
    }
}

const PostListNav = (props) => {
    const { handleChange, sortItemsBy, filterInputValue, filterSelectValue, paginationItemsPerSite } = props

    const sortOptions = [
        { value: '1', content: 'Sort Newest to Oldest' },
        { value: '2', content: 'Sort Oldest to Newest' },
        { value: '3', content: 'By title, A to Z' },
        { value: '4', content: 'By title, Z to A' }
    ]
    const filterOptions = [
        { value: '1', content: 'By content' },
        { value: '2', content: 'By author' }
    ]

    const showItemsOptions = [
        { value: 5, content: '5' },
        { value: 10, content: '10' },
        { value: 20, content: '20' }
    ]

    return (
        <SearchBar
            handleChange={handleChange}
            sortItemsBy={sortItemsBy}
            filterInputValue={filterInputValue}
            filterSelectValue={filterSelectValue}
            paginationItemsPerSite={paginationItemsPerSite}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            showItemsOptions={showItemsOptions}
        />
    )
}

const PostListAdd = (props) => {
    const { handleChange, handlePostAddToggle, handlePostAdd, state } = props

    if (state.postListAddIsActive) {
        return (
            <form className='card mb-2' onSubmit={handlePostAdd}>
                <div className='card-body'>
                    <textarea className='form-control' name='name' value={state.name} placeholder='Enter post body' onChange={handleChange} />
                </div>
                <div className='card-footer d-flex justify-content-end'>
                    <div className='d-flex align-items-center me-2'>
                        <small className='text-muted '>Do you want to add new post?</small>
                    </div>
                    <Button className='btn btn-sm text-danger me-2' handleMethod={() => handlePostAddToggle(false)}><FontAwesomeIcon icon={faTimes} /></Button>
                    <ButtonSubmit className='btn btn-sm text-success' ><FontAwesomeIcon icon={faCheck} /></ButtonSubmit>
                </div>
            </form >
        )
    } else {
        return (
            <div className='d-flex justify-content-end mb-2'>
                <Button className='btn btn-primary btn-sm' handleMethod={() => handlePostAddToggle(true)}>Add Post</Button>
            </div>

        )
    }
}

const PostListFooter = (props) => {
    const { params, paginationItemsPerSite } = props
    const filteredData = getData('filteredData')

    return (
        <footer className='d-flex justify-content-center'>
            <Pagination array={filteredData} route={`/post/${params.thread}/`} site={params.site} paginationItemsPerSite={paginationItemsPerSite} />
        </footer>
    )
}

const PostListNavigation = (props) => {
    const params = useParams()

    return <PostList {...props} params={params} />
}

export default PostListNavigation