import React from 'react'
import { ButtonSubmit } from '../components/Button'
import { getData, setData } from '../utilities/dataUtils'

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

    handleSignIn = () => {
        const users = getData('users')
        const user = users.find(user => user.name === this.state.name)

        if (this.state.name === '' || this.state.password === '') {
            alert('Enter login and password')
        } else if (user === undefined) {
            alert('There is no user with that name')
        } else if (user.password !== this.state.password) {
            alert('Wrong password')
        } else {
            setData('loggedUserId', user.id)
            setData('isAuth', true)
            this.props.handleAuth(true)
        }
        this.handleResetForm()
    }

    render() {
        return (
            <section className='d-flex justify-content-center'>
                <form className='col-2' onSubmit={this.handleSignIn}>
                    <div className='form-group'>
                        <label for='exampleInputEmail1'>Email address</label>
                        <input type='text' name='name' value={this.state.name} placeholder='Enter name' onChange={this.handleChange} className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
                    </div>
                    <div className='form-group mb-3'>
                        <label for='exampleInputPassword1'>Password</label>
                        <input type='password' name='password' value={this.state.password} placeholder='Enter password' onChange={this.handleChange} className='form-control' id='exampleInputPassword1' />
                    </div>
                    <ButtonSubmit className='btn btn-primary w-100 bg-danger'>SignIn</ButtonSubmit>
                </form>
            </section>
        )
    }
}

export default SignIn