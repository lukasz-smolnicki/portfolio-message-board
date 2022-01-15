import React, { Component } from 'react'
import Navbar from './layouts/Navbar'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Footer from './layouts/Footer'
import Error from './components/Error'
import Loading from './components/Loading'
import { checkData, setData, getData } from './utils/dataUtils'

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    isAuth: false,
  }

  handleAuth = (value) => {
    this.setState({
      isAuth: value
    })
  }

  fetchData = () => {
    checkData('counters', 'posts', 'threads', 'users')
      ?
      this.setState({
        isLoaded: true
      })
      :
      fetch('data/data.json')
        .then(res => res.json())
        .then(
          (result) => {
            const data = result
            setData('counters', data.counters)
            setData('posts', data.posts)
            setData('threads', data.threads)
            setData('users', data.users)
            this.setState({
              isLoaded: true,
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
  }

  userIsAuthSet = () => {
    const isAuth = getData('isAuth')

    isAuth === true
      ?
      this.setState({
        isAuth: true
      })
      :
      this.setState({
        isAuth: false
      })
  }

  componentDidMount() {
    this.fetchData()
    this.userIsAuthSet()
  }

  render() {
    const { error, isLoaded } = this.state
    if (error) {
      return (
        <Error />
      )
    } else if (!isLoaded) {
      return (
        <Loading />
      )
    } else {
      return (
        <>
          <Navbar isAuth={this.state.isAuth} handleAuth={this.handleAuth} />
          <Header isAuth={this.state.isAuth} />
          <Main isAuth={this.state.isAuth} handleAuth={this.handleAuth} />
          <Footer />
        </>
      )
    }
  }
}

export default App