import React from 'react'
import Loading from '../../components/Loading'
import { getData } from '../../utilities/dataUtils'

class PostListHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            threads: []
        }
    }

    componentDidMount() {
        this.setState({
            users: getData('users'),
            threads: getData('threads')
        })
    }

    render() {
        const { users, threads } = this.state
        const { params } = this.props

        if (users.length > 0 && threads.length > 0) {
            const thread = threads.find(thread => thread.id === parseInt(params.thread))
            return (
                <PostListHeaderItem thread={thread} />
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

const PostListHeaderItem = (props) => {
    const { thread } = props

    return (
        <div className='card mb-2'>
            <div className='card-header'>
                {thread.name}
            </div>
            <div className='card-body'>
                {thread.body}
            </div>
            <div className='card-footer'>
                {thread.date}
            </div>
        </div>
    )
}

export default PostListHeader

