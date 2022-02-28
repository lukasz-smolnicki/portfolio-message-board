import React from 'react'
import { ButtonSubmit } from '../components/Button'
import { getData, setData } from '../utilities/dataUtils'
import { getFormatedDate } from '../utilities/utils'

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
            <section className='d-flex justify-content-center'>
                <form onSubmit={this.handleSignUp}>
                    <div className='form-group'>
                        <label htmlFor='userInput'>User name</label>
                        <input type='text' name='name' autoComplete='current-user' value={this.state.name} placeholder='Enter user name' onChange={this.handleChange} className='form-control' id='userInput' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='inputEmail'>Email address</label>
                        <input type='email' name='email' autoComplete='current-email' value={this.state.email} placeholder='Enter email' onChange={this.handleChange} className='form-control' id='inputEmail' />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='inputPassword'>Password</label>
                        <input type='password' name='password' autoComplete='current-password' value={this.state.password} placeholder='Enter password' onChange={this.handleChange} className='form-control' id='inputPassword' />
                    </div>
                    <ButtonSubmit className='btn btn-primary w-100 btn-danger'>SignUp</ButtonSubmit>
                </form>
            </section>
        )
    }
}

export default SignUp