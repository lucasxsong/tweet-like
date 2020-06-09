import * as React from 'react';
import './App.css';

interface Props {
	city: string;
}
interface State {
	ngrams: any;
	tweet: string;
	isLoaded: boolean;
}
class Tweeta extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = {
			ngrams: null,
			isLoaded: false,
			tweet: '',
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.gentweet = this.gentweet.bind(this);
	}

	// helper function that returns random element given array
	randomchoice(a: string[]) {
        // return a[Math.floor(Math.random() * a.length)];
        return "hi"
	}

	startsent() {
		let possiblewords: string[] = [];
		let first: string = "";
		for (let b in this.state.ngrams) {
			if (first === "begsent" && this.state.ngrams[b] > 1)
				possiblewords.push(b);
		}

		return this.randomchoice(possiblewords);
	}

	getword(word: string, sentlength: number, length: number) {
		let possiblewords: string[] = [];
		let newword: string,
			first: string = '';

		for (let b in this.state.ngrams) {
			first = b.split(' ')[0];

			if (first === word && this.state.ngrams[b] > 0) {
				newword = b.split(' ')[0];
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

	wordgen(length: number) {
		if (this.state.ngrams) {
            const seed: string = this.startsent();
            let sent: string = seed.split(" ")[1];
            console.log(seed, sent)

			let nextword = this.getword(sent, 0, length);
			while (nextword !== '' && sent.length < length) {
				sent += ' ' + nextword;
				nextword = this.getword(nextword, sent.length, length);
			}

			if (sent !== null && (/@/.exec(sent) || []).length === sent.length) {
				sent = this.wordgen(length);
			} else {
				return sent;
			}
		}
		return '';
	}

	gentweet() {
		console.log('gettweet called');
		const tweet = this.wordgen(140);
		console.log(tweet);

		if (tweet) {
			this.setState({ tweet: tweet });
			return true;
		} else {
			return false;
		}
	}

	componentDidMount() {
		const filename = 'data/ngramsbycity/' + this.props.city + '.json';
		fetch(filename)
			.then((r: any) => r.json())
			.then((text: any) => {
				this.setState({ ngrams: text, isLoaded: true }, () => {
					console.log(this.state);
				});
			});
	}

	render() {
		const tweet = this.wordgen(140);

		if (this.state.ngrams) return <div className="App">{tweet}</div>;
		else return <> loading </>;
	}
}

export default Tweeta;
