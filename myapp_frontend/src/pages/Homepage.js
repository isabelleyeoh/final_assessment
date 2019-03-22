import React, { Component } from 'react';
import UserImages from '../containers/UserImages';
import Loader from '../components/Loader';
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';


  // stateless component

  export default class Homepage extends React.Component{

   


render(){
  const {users, isLoading} = this.props
 

  return (

    <>
    <div>
      <h1>Home Page</h1>
      {isLoading ? 
        <Loader type="grow" color="primary"/>
        : null 
        }
    </div>
    <div>

    {
    users.map((user,index) =>

    <Row >
    <Col sm ="3">
    <Card key ={index}>
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

      <Col sm ="9" className="bg-light border border-light">
          <UserImages userId={user.id}/>

      </Col>
    
      </Row> 
          )
        }

    </div>        

    </>
    
  )
}

}
