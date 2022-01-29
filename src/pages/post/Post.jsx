import React from 'react'
import PostItem from './PostItem'
import PostItemEdit from './PostItemEdit'

class Post extends React.Component {
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
        const { post } = this.props

        this.setState({
            name: post.name,
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
        const { post } = this.props

        this.setState({
            name: post.name
        })
    }

    handleToggle = (property, value) => {
        this.setState({
            [property]: value
        })
        this.handleResetForm()
    }

    render() {
        const { isEdit, isDelete, name, body } = this.state
        const { isAuth, post, handlePostEdit, handlePostDelete } = this.props
        console.log(isEdit, isAuth)
        if (isEdit) {
            return (
                <PostItemEdit post={post} name={name} body={body} handleChange={this.handleChange} handleToggle={this.handleToggle} handlePostEdit={handlePostEdit} />
            )
        } else {
            return (
                <PostItem post={post} isDelete={isDelete} handleToggle={this.handleToggle} handlePostDelete={handlePostDelete} />
            )
        }
    }
}

export default Post