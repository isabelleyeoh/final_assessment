import React, { Component } from 'react';
import Homepage from './pages/Homepage';
import axios from 'axios';
import { Route, Link } from "react-router-dom"
import UserProfilePage from './pages/UserProfilePage';
import './App.css';
import Navbar from './components/Navbar'
import MyProfilePage from './pages/MyProfilePage';


// import Loader from './components/Loader';


class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    hasErrors: false,
    showMessage: false
  }



  componentDidMount = () => {

    axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/users/',
    })
    // .then(result => {
    //   // If successful, we do stuffs with 'result'
    //   this.setState({
    //     users: result.data,
    //     isLoading: false
    //   })
    // })
    // .catch(error => {
    //   // If unsuccessful, we notify users what went wrong
    //   console.log('ERROR: ', error)
    //   this.setState({
    //     hasErrors: true,
    //     isLoading: false
    //   })
    // });
  }

  toggleNotice = () => {
    this.setState({
      showMessage: !this.state.showMessage
    })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const { users, isLoading, toggleNotice, showMessage } = this.state

    return (
      <>
        {/* pass users into homepage. by doing this, users become a prop in homepage.
    this.props.user will give you all the users in homepage. */}

        {/* switch or exact function will stop the other pages from loading */}

        <Navbar toggleNotice={toggleNotice} showMessage={showMessage} />

        {showMessage ? <p>You have logged in!</p> : null}


        <div>

          <Route exact path="/" component={props => <Homepage users={users} isLoading={isLoading} {...props} />} />
          {/* passing props using a function */}
          <Route path={`/users/:id`} component={props => <UserProfilePage users={users} {...props} />} />
          <Route exact path="/profile" component={props => <MyProfilePage />} />
        </div>


      </>
    )

  }
}



export default App;
