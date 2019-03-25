import React from 'react';
import axios from 'axios';
import { Route } from "react-router-dom"
import './App.css';

// Components
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import UserProfilePage from './pages/UserProfilePage';
import History from './pages/History';
import Venue from './pages/Venue'


class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    hasErrors: false,
    showMessage: false,
    venue: []
  }

  componentDidMount = () => {

    axios({
      method: 'get',
      url: `http://localhost:5000/api/v1/users/`,
    })
      .then(result => {
        console.log(result)
        this.setState({
          users: result.data,
          isLoading: false
        })
      })
      // If successful, we do stuff with 'result'
      .catch(error => {
        console.log('ERROR: ', error)
        this.setState({
          hasErrors: true,
          isLoading: false
        })
      });
    // If unsuccessful, we notify users what went wrong
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

        <Navbar toggleNotice={toggleNotice} showMessage={showMessage} />
        {showMessage ? <p>You have logged in!</p> : null}

        <div>
          <Route exact path="/" component={props => <Homepage />} />
          <Route path={`/user/:id`} component={props => <UserProfilePage users={users} />} />
          <Route path="/history/:id" component={props => <History />} />
          <Route path="/venue/venue_id" component={props => <Venue />} />

        </div>


      </>
    )

  }
}



export default App;
