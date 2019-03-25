import React from 'react';
import axios from 'axios';
import Image from "react-graceful-image";

// Styles
import '../styles/index.css';
import '../styles/Venue.css';

// Components
import PriceTier from '../components/PriceTier.js';
import Photos from '../components/Photos.js';


class Venue extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      is_loading: true,
      venue_id: this.props.match.params.id,
      venue: '',
      cover_photo: '',
      tips: ''
    }
  }

  componentDidMount = () => {

    let self = this;

    this.setState({ is_loading: true });

    axios({
      method: 'get',
      url: `https://api.foursquare.com/v2/venues/` + this.state.venue_id,
      params: {
        client_id: 'L5SR1EXYJILSL5QASZBISWFNB5D0JKIWVWILMWYVKO24FWBA',
        client_secret: 'QTYAE4RG51LAYVIYEGUGLMRVEPJG3TJYY5WLD1H0I3AY3SHU',
        v: '20180323'
      }
    })

      .then(result => {
        console.log(result)
        this.setState({
          is_loading: false,
          venue: '',
          cover_photo: '',
          tips: ''

        })

        if (result.data.meta.code === 200) {

          if (result.data.result.venue !== undefined) {

            let venue = result.data.result.venue;
            let cover_photo = venue.bestPhoto.prefix + venue.bestPhoto.width + 'x' + venue.bestPhoto.height + venue.bestPhoto.suffix;

            this.setState({ venue: venue, cover_photo: cover_photo, tips: venue.tips.groups[0].items.slice(0, 10) });
          }

        }


      })

      .catch(error => {

        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
        this.setState({
          is_loading: false,
          venue: '',
          cover_photo: '',
          tips: ''
        })
      });

  }


  render_name() {

    if (this.state.is_loading === false) {

      if (this.state.venue !== '') {
        return this.state.venue.name;
      } else {
        return 'Venue couldn\'t been found!';
      }

    } else {
      return 'Venue is been loading...';
    }

  }

  render_bottom() {

    if (this.state.is_loading === false) {

      if (this.state.venue !== '') {
        return (
          <div className="venue-header-bottom box-sizing">

            <div className="venue-header-summary">

              <div className="venue-header-summary-point-wrapper">
                <div className="venue-header-summary-point-square"></div>
                <div className="venue-header-summary-point-text">{this.state.venue.rating === undefined || this.state.venue.rating === '' ? '0.0' : this.state.venue.rating.toFixed(1)}</div>
              </div>

              <div className="venue-header-summary-row">
                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../images/icons/pin.png')} alt="Adress" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.location.address === undefined && this.state.venue.location.address === '' ? 'Address not found!' : this.state.venue.location.address}</div>
                </div>
              </div>

              <div className="venue-header-summary-row">
                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../images/icons/phone.png')} alt="Phone Number" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.contact.formattedPhone === undefined && this.state.venue.contact.formattedPhone === '' ? 'Phone number not found!' : this.state.venue.contact.formattedPhone}</div>
                </div>
              </div>

              <div className="venue-header-summary-row">

                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../images/icons/user.png')} alt="Visitors" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.hereNow.count === undefined && this.state.venue.hereNow.count === '' ? 0 : this.state.venue.hereNow.count}</div>
                </div>

                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../images/icons/price.png')} alt="Price" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">
                    <PriceTier tier={this.state.venue.price !== undefined && this.state.venue.price !== '' ? this.state.venue.price.tier : 0} />
                  </div>
                </div>

              </div>

            </div>

          </div>
        );
      }

    }

  }

  render() {
    return (
      <div className="venue">

        <div className="venue-header" style={{ backgroundImage: 'url(' + this.state.cover_photo + ')' }}>

          <div className="venue-header-top">

            <div className="venue-header-logo-wrapper">
              <img className="venue-header-logo" src={require('../images/logos/logo-white-thin.png')} alt="Logo" />
              <img className="venue-header-icon" src={require('../images/icons/venue.png')} alt="Venue" />
            </div>

            <div className="venue-header-name box-sizing">{this.render_name()}</div>

          </div>

          {this.render_bottom()}

        </div>



      </div>
    );
  }

}



export default Venue;
