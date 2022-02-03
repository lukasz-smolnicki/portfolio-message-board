import React from 'react'
import Loading from '../../components/Loading'
import { getData, setData } from '../../utilities/dataUtils'
import { Button, ButtonSubmit } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { getFormatedDate } from '../../utilities/utils'

class PostListHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            threads: [],
            isDelete: false,
            isEdit: false,
            name: '',
            body: '',
        }
    }

    componentDidMount() {
        this.setState({
            users: getData('users'),
            threads: getData('threads')
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
        const { threads } = this.state
        const { params } = this.props
        const thread = threads.find(thread => thread.id === parseInt(params.thread))
        this.setState({
            name: thread.name,
            body: thread.body
        })
    }

    handleToggle = (property, value) => {
        this.setState({
            [property]: value
        })
        this.handleResetForm()
    }

    handleThreadEdit = (thread) => {
        const { threads, name, body } = this.state
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

    render() {
        const { users, threads, isDelete, isEdit } = this.state
        const { params } = this.props

        if (users.length > 0 && threads.length > 0) {
            const thread = threads.find(thread => thread.id === parseInt(params.thread))
            if (isEdit) {
                return (
                    <PostListHeaderItemEdit thread={thread} state={this.state} isDelete={isDelete} handleToggle={this.handleToggle} handleThreadDelete={this.handleThreadDelete} handleThreadEdit={this.handleThreadEdit} handleChange={this.handleChange} />
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
    const { thread, handleToggle, state, handleChange, handleThreadEdit } = props
    const { name, body } = state
    const users = getData('users')
    const loggedUserId = getData('loggedUserId')
    const user = users.find(user => user.id === thread.userId)

    return (
        <form className='card mb-2' onSubmit={() => {
            handleThreadEdit(thread)
            handleToggle('isEdit', false)
        }}>
            <div className='card-header'>
                <input className='form-control' type='text' name='name' value={name} placeholder='Title' onChange={handleChange} />
            </div>
            <div className='card-body'>
                <textarea className='form-control' type='text' name='body' value={body} placeholder='Message' onChange={handleChange} />
            </div>
            <div className='card-footer d-flex justify-content-between'>
                <small className='text-muted'>Created by: {user.name} in {thread.date}</small>
                <div>
                    <span>Do you want save changes?</span>
                    <Button className='btn btn-sm text-danger me-2' handleMethod={() => handleToggle('isEdit', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                    <ButtonSubmit className='btn btn-sm text-success' ><FontAwesomeIcon icon={faCheck} /></ButtonSubmit>
                </div>
            </div>
        </form>
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

