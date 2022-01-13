import React, { Component } from 'react'
import Navbar from './layouts/Navbar'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Footer from './layouts/Footer'
import Loading from './components/Loading'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      isAuth: false,
    }
  }

  fetchData = () => {
    const dataStorage = localStorage.getItem('data')
    if (dataStorage === null) {
      fetch('data/data.json')
        .then(res => res.json())
        .then(
          (result) => {
            localStorage.setItem('data', JSON.stringify(result))
            this.setState({
              isLoaded: true,
              data: result
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
        isLoaded: true,
        data: JSON.parse(localStorage.getItem('data'))
      })
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { error, isLoaded } = this.state
    if (error) {
      return <p>ERROR: Something's going wrong</p>
    } else if (!isLoaded) {
      return <p>Loading...</p>
    } else {
      return (
        <>
          <Navbar />
          <Header />
          <Main />
          <Footer />
        </>
      )
    }
  }
}

export default App