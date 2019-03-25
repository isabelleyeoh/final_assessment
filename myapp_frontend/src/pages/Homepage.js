import React from 'react';
import { Link } from "react-router-dom";

// Styles
import '../styles/index.css';
import '../styles/Home.css';

// Components
import Header from '../components/Header.js';
import Venues from '../components/Venues.js'
import RecentSearches from '../components/RecentSearches.js';
import Loading from '../components/Loading'


export default class Homepage extends React.Component {


  render() {
    const { users, isLoading } = this.props


    return (

      <>
        <Header type="long" />

        {isLoading ?
          <Loading type="grow" color="muted" />
          : null
        }

        <div className="home-venues">
          <Venues />
        </div>

        <div className="home-recent-searches">
          <RecentSearches />
        </div>



      </>

    )
  }


}