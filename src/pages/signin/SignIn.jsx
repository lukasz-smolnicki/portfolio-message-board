import React from 'react'
import Button from '../../components/Button'
import { getData, setData } from '../../utils/dataUtils'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    handleResetForm = () => {
        this.setState({
            name: '',
            password: ''
        })
    }

    handleSignIn = (e) => {
        e.preventDefault()
        const users = getData('users')
        const user = users.find(user => user.name === this.state.name)

        if (this.state.name === '' || this.state.password === '') {
            alert('Enter login and password')
        } else if (user === undefined) {
            alert('There is no user with that name')
        } else if (user.password !== this.state.password) {
            alert('Wrong password')
        } else {
            this.setState({
                loggedUserId: user.id
            })
            setData('loggedUserId', user.id)
            this.props.handleAuth(true)
        }
        this.handleResetForm()
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSignIn}>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} placeholder='Enter name' onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} placeholder='Enter password' onChange={this.handleChange} />
                    </label>
                    <Button>SignIn</Button>
                </form>
            </section>
        )
    }
}

export default SignIn