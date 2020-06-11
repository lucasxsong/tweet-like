import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';

interface Props {
	text: string;
	username: string;
    location: string;
    id: any;
}

interface State {}

class TweetCard extends Component<Props, State> {
	// state = {  }

	render() {
        let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		let date:String = mm + '/' + dd + '/' + yyyy;
        const url = 'https://twitter.com/' + this.props.username;
		return (
			<Feed.Event id = {this.props.id}>
				<Feed.Content>
					<Feed.Summary
						className="results-text"
						style={{ paddingBottom: '10px' }}
					>
						<a href={url} target="_blank">
							@{this.props.username}
						</a>
						<Feed.Date>· {date}</Feed.Date>
						<Feed.Extra text>{this.props.text} </Feed.Extra>
						<Feed.Date>From: {this.props.location}</Feed.Date>
					</Feed.Summary>
				</Feed.Content>
			</Feed.Event>
		);
	}
}

export default TweetCard;
