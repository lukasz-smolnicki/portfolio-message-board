import React from 'react'
import { ButtonSubmit } from '../../components/Button'
import { getData, setData } from '../../utils/dataUtils'
import { getFormatedDate } from '../../utils/utils'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
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
            email: '',
            password: ''
        })
    }

    handleSignUp = () => {
        const users = getData('users')
        const counters = getData('counters')
        const user = users.find(user => user.name === this.state.name)
        const email = users.find(user => user.email === this.state.email)

        if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
            alert('Enter login, email and password')
        } else if (user !== undefined || email !== undefined) {
            alert('Nick or email already exists')
        } else {
            const newUser = {
                id: ++counters.userId,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                date: getFormatedDate()
            }
            users.push(newUser)
            setData('users', users)
            setData('counters', counters)
            setData('loggedUserId', counters.userId)
            setData('isAuth', true)
            this.props.handleAuth(true)
        }
        this.handleResetForm()
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSignUp}>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} placeholder='Enter name' onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={this.state.email} placeholder='Enter email' onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} placeholder='Enter password' onChange={this.handleChange} />
                    </label>
                    <ButtonSubmit>SignUp</ButtonSubmit>
                </form>
            </section>
        )
    }
}

export default SignUp