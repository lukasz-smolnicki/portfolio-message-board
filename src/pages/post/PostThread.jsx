import React from 'react'
import { getData, setData } from '../../utilities/dataUtils'
import { Button } from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class PostThread extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            isDelete: false,
            name: '',
            body: ''
        }
    }

    componentDidMount() {
        const { threads, users, params } = this.props
        this.setState(
            threads,
            users,
            params
        )
    }

    handleToggle = (property, value) => {
        this.setState({
            [property]: value
        })
        this.handleResetForm()
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handleResetForm = () => {
        const { thread } = this.props

        this.setState({
            name: thread.name,
            body: thread.body
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
        const { threads, users, params } = this.props
        const thread = threads.find(thread => thread.id === parseInt(params.thread))
        const user = users.find(user => user.id === thread.userId)
        const loggedUserId = getData('loggedUserId')

        if (threads.length > 0 && users.length > 0) {
            return (
                <div className='card mb-2'>
                    <div className='card-header'>
                        {thread.name}
                    </div>
                    <div className='card-body'>
                        {thread.body}
                    </div>
                    <div className='card-footer'>
                        <div className='col-12 d-flex justify-content-between'>
                            <small className='text-muted'>Created by: {user.name} in {thread.date}</small>
                            <div>
                                {(loggedUserId === user.id) && <ThreadItemButtons thread={thread} isDelete={this.isDelete} handleToggle={this.handleToggle} handleThreadDelete={this.handleThreadDelete} />}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <p>Loading..</p>
                </>
            )
        }
    }
}

const ThreadItemButtons = (props) => {
    const { thread, isDelete, handleToggle, handleThreadDelete } = props

    if (isDelete) {
        return (
            <>
                <span>Do you want to delete post?</span>
                <Button className='btn btn-sm text-danger' handleMethod={() => handleToggle('isDelete', false)}><FontAwesomeIcon icon={faTimes} /></Button>
                <Button className='btn btn-sm text-success' handleMethod={() => handleThreadDelete(thread)}><FontAwesomeIcon icon={faCheck} /></Button>
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

export default PostThread