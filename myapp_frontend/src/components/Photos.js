import React, { Component } from 'react';
import axios from 'axios';

// Styles
import '../styles/index.css';
import '../styles/Photos.css';

// Components
import NotFound from '../components/NotFound.js';
import Loading from '../components/Loading.js';


export default class Photos extends Component {

	constructor(props) {

		super(props);

		this.state = {
			is_loading: true,
			photos: []
		};

	}

	componentDidMount() {
		this.get_photos();
	}

	get_photos() {

		let self = this;
		let venue_id = this.props.id;

		this.setState({ is_loading: true });

		axios.get('https://api.foursquare.com/v2/venues/' + venue_id + '/photos', {
			params: {
				client_id: 'L5SR1EXYJILSL5QASZBISWFNB5D0JKIWVWILMWYVKO24FWBA',
				client_secret: 'QTYAE4RG51LAYVIYEGUGLMRVEPJG3TJYY5WLD1H0I3AY3SHU',
				v: '20180323',
				limit: 12
			}
		}).then((response) => {

			self.setState({ is_loading: false, photos: [] });

			if (response.data.meta.code === 200) {

				if (response.data.response.photos.items !== undefined) {
					self.setState({ photos: response.data.response.photos.items });
				}

			}

		}).catch((error) => {
			self.setState({ is_loading: false, photos: [] });
		});

	}

	render_list() {

		if (this.state.is_loading === false) {

			if (this.state.photos.length > 0) {

				return this.state.photos.map((photo, key) => (
					<div key={key} className="photo-element box-sizing">

						<div className="photo-element-content box-sizing" style={{ backgroundImage: 'url(' + photo.prefix + photo.width + 'x' + photo.height + photo.suffix + ')' }}>


						</div>

					</div>
				));

			} else {
				return (
					<NotFound text={'There is no photo for this venue'} icon={require('../images/icons/no-image.png')} />
				);
			}

		} else {
			return (
				<Loading text={'Loading venue photos...'} />
			);
		}

	}

	render() {
		return (
			<div className="photos">

				{this.render_list()}

			</div>
		);
	}

}