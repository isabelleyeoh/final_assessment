import React from 'react';
import UserImages from '../containers/UserImages';
import Loader from '../components/Loader';
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';




// const CLIENT_ID = '4VMVDF0DJLP4DKSFNW210VFMEL1OJ3P5HAAQJGOC4YFYIOJ2';
// const CLIENT_SECRET = 'ZXA5FEE4GJY4S525PBWUDM22R3FTNTOHKQ0FMJNV0GGBTYBU';
// const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
// const API_DEBOUNCE_TIME = 2000;

export default class Homepage extends React.Component {

  //   state = {
  //     mapRegion: null,
  //     gpsAccuracy: null,
  //     recommendations: [],
  //     lookingFor: null,
  //     headerLocation: null,
  //     last4sqCall: null
  //   }
  //   watchID = null

  //   componentWillMount() {
  //     this.watchID = navigator.geolocation.watchPosition((position) => {
  //       let region = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         latitudeDelta: 0.00922 * 1.5,
  //         longitudeDelta: 0.00421 * 1.5
  //       }

  //       this.onRegionChange(region, position.coords.accuracy);
  //     });
  //   }

  //   componentWillUnmount() {
  //     navigator.geolocation.clearWatch(this.watchID);
  //   }

  //   onRegionChange(region, gpsAccuracy) {
  //     this.fetchVenues(region);

  //     this.setState({
  //       mapRegion: region,
  //       gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
  //     });
  //   }

  //   fetchVenues(region, lookingFor) {
  //     if (!this.shouldFetchVenues(lookingFor)) return;

  //     const query = this.venuesQuery(region, lookingFor);

  //     fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
  //       .then(fetch.throwErrors)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.response.groups) {
  //           this.setState({
  //             recommendations: json.response.groups.reduce(
  //               (all, g) => all.concat(g ? g.items : []), []
  //             ),
  //             headerLocation: json.response.headerLocation,
  //             last4sqCall: new Date()
  //           });
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }

  //   shouldFetchVenues(lookingFor) {
  //     return lookingFor != this.state.lookingFor
  //       || this.state.last4sqCall === null
  //       || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
  //   }

  //   venuesQuery({ latitude, longitude }, lookingFor) {
  //     return queryString({
  //       client_id: CLIENT_ID,
  //       client_secret: CLIENT_SECRET,
  //       v: 20170305,
  //       ll: `${latitude}, ${longitude}`,
  //       llAcc: this.state.gpsAccuracy,
  //       section: lookingFor || this.state.lookingFor || 'food',
  //       limit: 10,
  //       openNow: 1,
  //       venuePhotos: 1
  //     });
  //   }

  //   onTopicSelect(lookingFor) {
  //     this.fetchVenues(this.state.mapRegion, lookingFor);

  //     this.setState({
  //       lookingFor: lookingFor
  //     });
  //   }



  //   render() {
  //     const { users, isLoading } = this.props
  //     const { mapRegion, lookingFor } = this.state

  //     if (mapRegion) {
  //       return (
  //         <Screen>
  //           <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />

  //           {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)} />
  //             : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} />}
  //         </Screen>
  //       );
  //     }
  //     else {
  //       return (
  //         <div>
  //           {isLoading ?
  //             <Loader type="grow" color="primary" />
  //             : null
  //           }
  //         </div>
  //       );
  //     }
  //   }


  render() {
    const { users, isLoading } = this.props


    return (

      <>
        <div>
          <h1>Home Page</h1>
          {isLoading ?
            <Loader type="grow" color="primary" />
            : null
          }
        </div>
        <div>

          {
            users.map((user, index) =>

              <Row >
                <Col sm="3">
                  <Card key={index}>
                    <Link to={`/users/${user.id}`}>
                      <CardImg id="profileImage"
                        src={user.profileImage}
                        width="20px"
                        style={{ padding: "20px" }}
                        alt="profile image"
                        retry={{ count: 10, delay: 2 }} />
                    </Link>
                    <CardBody>
                      <CardTitle>{user.username}</CardTitle>
                      <CardText>To insert text</CardText>

                    </CardBody>
                  </Card>
                </Col>

                <Col sm="9" className="bg-light border border-light">
                  <UserImages userId={user.id} />

                </Col>

              </Row>
            )
          }

        </div>

      </>

    )
  }


}