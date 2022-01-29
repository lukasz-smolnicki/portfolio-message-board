import React from 'react'

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
        return (
            <>aaa</>
        )
    }
}

export default Post