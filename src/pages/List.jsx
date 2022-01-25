import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Post from './Post'
import Thread from './Thread'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.setState({
        })
    }

    render() {
        console.log(this.props)
        return (
            <section>
                <Routes>
                    <Route path='thread' element={<Thread />} />
                    <Route path='post' element={<Post />} />
                </Routes>
            </section>
        )
    }
}

const ListNavigation = (props) => {
    const params = useParams()

    return <List {...props} params={params} />
}

export default ListNavigation