import React from 'react'
import { getData } from '../../utilities/dataUtils'
import { useParams } from 'react-router-dom'
import Error from '../../components/Error'
import Post from './Post'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: getData('threads'),
            users: getData('users'),
            posts: getData('posts')
        }
    }

    postList = () => {
        const { threads, posts, users, paginationItemsPerSite } = this.state
        const { params } = this.props
        // this.handleSortItems(threads)
        // const filteredData = this.handleFilterItems(threads, users)
        // setData('filteredData', filteredData)
        const siteIndex = parseInt(params.site)
        console.log(siteIndex)
        const sitePaginationIndex = siteIndex * paginationItemsPerSite
        const siteOfPosts = posts.slice(sitePaginationIndex - paginationItemsPerSite, sitePaginationIndex)
        if (typeof posts !== 'undefined' && posts.length > 0 && ((posts.length / paginationItemsPerSite) + 1) > siteIndex && siteIndex > 0) {
            return siteOfPosts.map(thread => <Post key={thread.id} isAuth={this.props.isAuth} thread={thread} handleThreadEdit={this.handleThreadEdit} handleThreadDelete={this.handleThreadDelete} />)
        } else {
            return (
                <Error message='Threads not found' />
            )
        }
    }

    render() {
        return (
            <section>
                <PostListNav />
                <PostListAdd />
                {this.postList}
                <PostListFooter />
            </section>
        )
    }
}

const PostListNav = () => {
    return (
        <>
        </>
    )
}

const PostListAdd = () => {
    return (
        <>
        </>
    )
}

const PostListFooter = () => {
    return (
        <>
        </>
    )
}
const PostListNavigation = (props) => {
    const params = useParams()
    console.log(params)

    return <PostList {...props} params={params} />
}

export default PostListNavigation