import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


class Delete extends React.Component {
	state = {
		hasError: true
	}

	deleteAccount = (e) => {

		e.preventDefault();

		const jwt = localStorage.getItem('jwt')

		axios({
			method: 'post',
			url: `http://localhost:5000/api/v1/users/delete`,
			data: {
				user: this.state.user,
			}
		})
			.then(result => {
				console.log(result)
				this.setState({
					user: result.data

				})
				window.alert("account deleted")
			})

			.catch(error => {
				console.log('ERROR: ', error)
				this.setState({
					hasErrors: true
				})
			});

	}

	render() {


		return (
			<>


				<div className='form-delete'>
					<div>
						<h5>Delete account</h5>
					</div>
					<Button onClick={this.deleteAccount}>Delete</Button>
				</div>




			</>
		)
	}


}



export default Delete;
