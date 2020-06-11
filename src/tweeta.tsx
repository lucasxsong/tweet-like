import * as React from 'react';
import './App.css';
import { Placeholder, Icon, Button, Feed } from 'semantic-ui-react';
import TweetCard from './tweetCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // ES6

interface Props {
	city: string;
	cityname: string;
	handleExit: any;
	bbigrams: any;
	tbigrams: any;
}
interface State {
	tbigrams: any;
	bbigrams: any;
	tweets: any[];
	bio: string;
	isLoaded: boolean;
}
class Tweeta extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = {
			bbigrams: null,
			tbigrams: null,
			isLoaded: false,
			tweets: [],
			bio: '',
		};
		// this.componentDidMount = this.componentDidMount.bind(this);
	}

	// helper function that returns random element given array
	randomchoice(a: string[]) {
		return a[Math.floor(Math.random() * a.length)];
	}

	startsent(bigrams: any) {
		let possiblewords: string[] = [];
		let first: string = '';
		for (let b in bigrams) {
			first = b.split(' ')[0];
			if (first === 'begsent' && bigrams[b] > 1) {
				possiblewords.push(b);
			}
		}
		return this.randomchoice(possiblewords);
	}

	getword(word: string, bigrams: any, sentlength: number, length: number) {
		let possiblewords: string[] = [];
		let newword: string,
			first: string = '';

		for (let b in bigrams) {
			first = b.split(' ')[0];

			if (first === word && bigrams[b] > 0) {
				newword = b.split(' ')[1];
				if (sentlength > length - 10 && newword === 'endsent') {
					return '';
				} else {
					possiblewords.push(newword);
				}
			}
		}
		if (possiblewords.length === 0) return '';
		else {
			newword = this.randomchoice(possiblewords);
			if (newword === 'endsent') return '';
			else return newword;
		}
	}

	wordgen(length: number, bigrams: any) {
		const seed: string = this.startsent(bigrams);
		let sent: any = seed ? seed.split(' ')[1] : '';

		let nextword = this.getword(sent, bigrams, 0, length);
		while (nextword !== '' && sent.length < length) {
			sent += ' ' + nextword;
			nextword = this.getword(nextword, bigrams, sent.length, length);
		}

		if (sent !== '' && (/@/.exec(sent) || []).length === sent.length) {
			sent = this.wordgen(length, bigrams);
		} else {
			return sent;
		}
	}

	// componentDidMount() {
	// 	const filename = 'data/ngramsbycity/' + this.props.city + '.json';
	// 	const filename2 = 'data/biosbycity/' + this.props.city + '.json';
	// 	fetch(filename)
	// 		.then((r: any) => r.json())
	// 		.then((text: any) => {
	// 			this.setState({ tbigrams: text });
	// 		});

	// 	fetch(filename2)
	// 		.then((r: any) => r.json())
	// 		.then((text: any) => {
	// 			this.setState({ bbigrams: text });
	// 		});

	// 	this.setState({ isLoaded: true });
	// }

	render() {
		// const { bio, tweets } = this.state;
		let tweets: string[] = [];

		for (let i: number = 0; i < 10; i++) {
			let t = this.wordgen(140, this.props.tbigrams);
			tweets.push(t);
		}
		let bio = this.wordgen(280, this.props.bbigrams);

		if (tweets[0].length > 1) {
			return (
				<div className="App">
					<div className="search-container results">
						<div className="results-card">
							<div className="search-header">
								<Icon name="twitter" size="big" className="twit" />
								tweetlike
							</div>
							<div className="bio">{bio}</div>
							<Feed
								style={{
									margin: '10px',
									maxWidth: '70vw',
									backgroundColor: '#e1e8ed',
									padding: '30px',
									borderRadius: '5px',
								}}
							>
								{/* <TransitionGroup> */}
								{tweets.map((e) => {
									return (
										// <CSSTransition
										// 	id={id}
										// 	timeout={200}
										// 	classNames="tweet"
										// >
										<TweetCard
											username="tweetlike"
											text={e}
											location={this.props.cityname}
										/>
										// </CSSTransition>
									);
								})}
								{/* </TransitionGroup> */}
							</Feed>
							<Button onClick={this.props.handleExit} icon="redo" />
						</div>
					</div>
				</div>
			);
		} else
			return (
				<div className="App">
					<div className="search-container results">
						<div className="search-card">
							<div className="search-header">
								<Icon name="twitter" size="big" className="twit" />
							</div>
							<div
								style={{
									backgroundColor: 'white',
									padding: '30px',
									margin: '10px',
									borderRadius: '5px',
								}}
							>
								<Placeholder
									fluid
									style={{
										color: '#e1e8ed',
										minHeight: '250px',
										borderRadius: '5px',
										margin: '10px',
										minWidth: '40vw',
									}}
								>
									<Placeholder.Header image>
										<Placeholder.Line length="full" />
										<Placeholder.Line length="full" />
									</Placeholder.Header>
									<Placeholder.Header length="full" image>
										<Placeholder.Line length="full" />
										<Placeholder.Line length="full" />
									</Placeholder.Header>
									<Placeholder.Header length="full" image>
										<Placeholder.Line length="full" />
										<Placeholder.Line length="full" />
									</Placeholder.Header>
									<Placeholder.Header length="full" image>
										<Placeholder.Line length="full" />
										<Placeholder.Line length="full" />
									</Placeholder.Header>
									<Placeholder.Header length="full" image>
										<Placeholder.Line length="full" />
										<Placeholder.Line />
									</Placeholder.Header>
								</Placeholder>
							</div>
							<Button onClick={this.props.handleExit} icon="redo" />
						</div>
					</div>
				</div>
			);
	}
}

export default Tweeta;
