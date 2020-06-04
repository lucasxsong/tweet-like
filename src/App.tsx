import React from 'react';
import logo from './logo.svg';
import './App.css';
import CityDropdown from './citydropdown';
import Tweeta from './tweeta';

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
            // showTweets: true,
            showTweets: false,
            cityfile:"",
			// cityfile: 'sanfrancisco',
		};
	}

	handleSelection = (city: string) => {
		this.setState({ city: city });
	};

	showTweets = () => {
		const fullcity = this.state.city.split(', ');
		const cityfile = fullcity[0].toLowerCase().replace(/ /g, '');
		this.setState({ cityfile: cityfile });
		if (cityfile != '') this.setState({ showTweets: true });
	};

	render() {
		if (!this.state.showTweets) {
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
		} else {
			return (
				<>
                    {/* <div className="App">Tweeta</div> */}
                    <Tweeta city={this.state.cityfile}/>
				</>
			);
		}
	}
}

export default App;
