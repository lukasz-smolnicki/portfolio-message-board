import React from 'react'
import Loading from '../../components/Loading'
import { getData, setData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

class PostListHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            threads: [],
            isDelete: false,
            isEdit: false,
        }
    }

    componentDidMount() {
        this.setState({
            users: getData('users'),
            threads: getData('threads')
        })
    }

    handleToggle = (property, value) => {
        this.setState({
            [property]: value
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

    render() {
        const { users, threads, isDelete, isEdit } = this.state
        const { params } = this.props

        if (users.length > 0 && threads.length > 0) {
            const thread = threads.find(thread => thread.id === parseInt(params.thread))
            if (isEdit) {
                return (
                    <PostListHeaderItemEdit />
                )
            } else {
                return (
                    <PostListHeaderItem thread={thread} isDelete={isDelete} handleToggle={this.handleToggle} handleThreadDelete={this.handleThreadDelete} />
                )
            }
        } else {
            return (
                <Loading />
            )
        }
    }
}

const PostListHeaderItem = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const users = getData('users')
    const loggedUserId = getData('loggedUserId')
    const user = users.find(user => user.id === thread.userId)

    return (
        <div className='card mb-2'>
            <div className='card-header'>
                {thread.name}
            </div>
            <div className='card-body'>
                {thread.body}
            </div>
            <div className='card-footer d-flex justify-content-between'>
                <small className='text-muted'>Created by: {user.name} in {thread.date}</small>
                <div>
                    {(loggedUserId === user.id) && <PostListHeaderItemButtons thread={thread} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />}
                </div>
            </div>
        </div>
    )
}

const PostListHeaderItemEdit = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const users = getData('users')
    const loggedUserId = getData('loggedUserId')
    const user = users.find(user => user.id === thread.userId)

    return (
        <div className='card mb-2'>
            <div className='card-header'>
                {thread.name}
            </div>
            <div className='card-body'>
                {thread.body}
            </div>
            <div className='card-footer d-flex justify-content-between'>
                <small className='text-muted'>Created by: {user.name} in {thread.date}</small>
                <div>
                    {(loggedUserId === user.id) && <PostListHeaderItemButtons thread={thread} isDelete={isDelete} handleToggle={handleToggle} handleThreadDelete={handleThreadDelete} />}
                </div>
            </div>
        </div>
    )
}

const PostListHeaderItemButtons = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props
    const navigate = useNavigate()

    if (isDelete) {
        return (
            <>
                <span>Do you want to delete thread?</span>
                <Button className='btn btn-sm text-danger' handleMethod={() => handleToggle('isDelete', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <Button className='btn btn-sm text-success' handleMethod={() => { handleThreadDelete(thread); navigate('/') }}><FontAwesomeIcon icon={faCheck} /></Button>
            </>
        )
    } else {
        return (
            <>
                <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isEdit', true)}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className='btn btn-sm text-primary' handleMethod={() => handleToggle('isDelete', true)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </>
        )
    }
}

export default PostListHeader

