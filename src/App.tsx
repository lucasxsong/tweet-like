import React from 'react';
import logo from './logo.svg';
import './App.css';
import CityDropdown from './citydropdown';

interface Props {}

interface State {
	city: string;
	showTweets: boolean;
	cityfile: string;
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			city: '',
			showTweets: false,
			cityfile: '',
		};
	}

	handleSelection = (city: string) => {
		this.setState({ city: city });
	};

	showTweets = () => {
		const fullcity = this.state.city.split(", ");
		const cityfile = fullcity[0].toLowerCase().replace(/ /g,'');
		this.setState({ cityfile: cityfile });
		this.setState({ showTweets: true });
		console.log(cityfile);
	};

	render() {
		return (
			<div className="App">
				<h1>
					Tweet like I'm from {this.state.city ? this.state.city : '...'}
				</h1>
				<button onClick={this.showTweets}> GO </button>
				<div className="selection">
					<CityDropdown onSelection={this.handleSelection} />
				</div>
			</div>
		);
	}
}

export default App;
