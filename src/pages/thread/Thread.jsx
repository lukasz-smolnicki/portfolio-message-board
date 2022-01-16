import React from 'react'
import ThreadItem from './ThreadItem'
import ThreadItemEdit from './ThreadItemEdit'

class Thread extends React.Component {
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
        const { thread } = this.props

        this.setState({
            name: thread.name,
            body: thread.body
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
        const { thread } = this.props

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

    render() {
        const { isEdit, isDelete, name, body } = this.state
        const { thread, handleThreadEdit } = this.props

        if (isEdit) {
            return (
                <ThreadItemEdit thread={thread} name={name} body={body} handleChange={this.handleChange} handleToggle={this.handleToggle} handleThreadEdit={handleThreadEdit} />
            )
        } else {
            return (
                <ThreadItem thread={thread} isDelete={isDelete} handleToggle={this.handleToggle} />
            )
        }
    }
}

export default Thread