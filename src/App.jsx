import React, { Component } from 'react'
import Navbar from './layouts/Navbar'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Footer from './layouts/Footer'
import Error from './components/Error'
import Loading from './components/Loading'
import { checkData, setData } from './utils/dataUtils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      isAuth: false,
    }
  }

  handleAuth = (value) => {
    this.setState({
      isAuth: value
    })
  }

  fetchData = () => {
    if (!checkData()) {
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
    } else {
      this.setState({
        isLoaded: true
      })
    }
  }

  componentDidMount() {
    this.fetchData()
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