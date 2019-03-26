import React from 'react';
import axios from 'axios';


class MyProfilePage extends React.Component {
    state = {
        user: '',
        hasError: true
    }

    componentDidMount = () => {

        const jwt = localStorage.getItem('jwt')

        debugger
        axios({
            method: 'get',
            url: `http://localhost:5000/api/v1/users/myprofile`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })


            .then(result => {
                console.log(result)

                debugger
                this.setState({
                    user: result.data

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


        return (
            <>
                <div>
                    <p>testing</p>
                </div>


            </>
        )
    }


}



export default MyProfilePage;
