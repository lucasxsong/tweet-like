import * as React from 'react';
import './App.css';

interface Props {
	city: string;
}
interface State {
	tbigrams: any;
	bbigrams: any;
	tweet: string;
	tweets: string[];
	isLoaded: boolean;
}
class Tweeta extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = {
			bbigrams: null,
			tbigrams: null,
			isLoaded: false,
			tweet: '',
			tweets: [],
		};
		this.componentDidMount = this.componentDidMount.bind(this);
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

	componentDidMount() {
		const filename = 'data/ngramsbycity/' + this.props.city + '.json';
		const filename2 = 'data/biosbycity/' + this.props.city + '.json';
		fetch(filename)
			.then((r: any) => r.json())
			.then((text: any) => {
				this.setState({ tbigrams: text });
			});
		fetch(filename2)
			.then((r: any) => r.json())
			.then((text: any) => {
				this.setState({ bbigrams: text, isLoaded: true });
			});
	}

	render() {
		if (this.state.isLoaded) {
			let tweets = [];
			let bio = this.wordgen(280, this.state.bbigrams);
			for (let i: number = 0; i < 20; i++) {
				let t = this.wordgen(140, this.state.tbigrams);
				tweets.push(t);
			}
			console.dir(tweets);
			return (
				<div className="App">
					{bio} <br /><br />
					{tweets.map((data) => {
						return <div> {data} <br/></div>;
					})}
				</div>
			);
		} else return <> loading </>;
	}
}

export default Tweeta;
