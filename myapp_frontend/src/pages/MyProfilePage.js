import React from 'react';
import axios from 'axios';
import Image from "react-graceful-image";

class MyProfilePage extends React.Component {
  state = {
    images: [],
    hasError: true
  }

  componentDidMount = () => {

    const jwt = localStorage.getItem('jwt')

    axios({
      method: 'get',
      url: `http://localhost:5000/api/v1/images`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

      .then(result => {
        console.log(result)

        debugger
        this.setState({
          images: result.data
        })

      })

      .catch(error => {

        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
        this.setState({
          hasErrors: true
        })
      });

  }

  render() {

    const { images } = this.state

    return (
      <div>
        {
          images.map(images =>
            <div key={images} id="images">
              <Image src={images}
                width="50%"
                height="50%"
                style={{ padding: "20px" }}
                alt="images"
                retry={{ count: 10, delay: 2 }}
              />
            </div>
          )
        }

      </div>
    )

  }
}



export default MyProfilePage;
