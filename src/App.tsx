import React from 'react';
import './App.css';
import CityDropdown from './citydropdown';
import Tweeta from './tweeta';
import { Icon, Button, Placeholder } from 'semantic-ui-react';

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
			// showTweets: false,
			// cityfile:"",
			cityfile: '',
		};
	}

	handleSelection = (city: string) => {
		this.setState({ city: city });
	};

	showTweets = (e: any) => {
		console.log(e);
		const fullcity = this.state.city.split(', ');
		const cityfile = fullcity[0].toLowerCase().replace(/ /g, '');
		this.setState({ cityfile: cityfile });
		if (cityfile !== '') this.setState({ showTweets: true });
	};

	handleExit = () => {
		this.setState({ showTweets: false, city: '' });
	};

	render() {
		if (!this.state.showTweets) {
			return (
				<div className="App">
					<div className="search-container">
						<div className="search-card">
							<div className="search-header">
								<Icon name="twitter" size="big" className="twit" />
								tweetlike
							</div>
							<div className="search-header">
								{/* like i'm from {this.state.city ? this.state.city : '...'} */}
								<span style={{ fontSize: '22px' }}> tweet like i'm from </span>
								<span className="selection">
									<CityDropdown onSelection={this.handleSelection} />
								</span>
							</div>
							<Button
								animated
								onClick={this.showTweets}
								style={{
									backgroundColor: '#486983b4',
									color: '#e1e8ed',
								}}
							>
								<Button.Content visible>
									<Icon name="paper plane outline" size="big" />
								</Button.Content>
								<Button.Content hidden>
                                    go!
								</Button.Content>
							</Button>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<>
					{/* <div className="App">Tweeta</div> */}
					<Tweeta
						cityname={this.state.city}
						city={this.state.cityfile}
						handleExit={this.handleExit}
					/>
				</>
			);
		}
	}
}

export default App;
