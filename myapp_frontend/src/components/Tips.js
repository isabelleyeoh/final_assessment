import React, { Component } from 'react';

// Styles
import '../styles/index.css';
import '../styles/Tips.css';

export default class Tips extends Component {

	constructor(props) {

		super(props);

		this.state = {
			tips: this.props.tips
		};

	}

	render_list() {

		if (this.state.tips.length > 0) {

			return this.state.tips.map((tip, key) => (
				<div key={key} className="tip-element box-sizing">

					<div className="tip-element-user-info box-sizing">

						<div className="tip-element-user-image">
							<div style={{ backgroundImage: 'url( ' + tip.user.photo.prefix + '80x80' + tip.user.photo.suffix + ' )' }}></div>
						</div>

						<div className="tip-element-user-name box-sizing">{tip.user.firstName} {tip.user.lastName !== undefined ? tip.user.lastName : ''}</div>

					</div>

					<div className="tip-element-text box-sizing">{tip.text}</div>

				</div>
			));

		} else {
			return (
				<div>Not Found</div>
			);
		}

	}

	render() {
		return (
			<div className="tips box-shadow-purple">

				<div className="tips-header box-sizing">TIPS</div>

				<div className="tips-body box-sizing">

					{this.render_list()}

				</div>

				<div className="tips-footer box-sizing">All Tips</div>

			</div>
		);
	}

}
