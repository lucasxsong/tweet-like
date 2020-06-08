import * as React from 'react';
import './App.css';

interface Props {
	city: string;
}
interface State {
	ngrams: any;
}

class Tweeta extends React.Component<Props, State> {
	constructor(props: Props) {
        super(props);
        this.state = {
			ngrams: null
		};
	}

	componentDidMount() {
		const filename = 'data/ngramsbycity/' + this.props.city + '.json';
		fetch(filename)
			.then((r: any) => r.json())
			.then((text: any) => {
				this.setState({ ngrams: text });
			});
	}

	randomchoice(a: String[]) {
		const index: number = Math.random() % (a.length - 1);
		return a[index];
	}

	startsent() {
		let possiblewords: String[] = new Array();
		let first: String = '';
		for (let b in this.state.ngrams) {
			first = b.split(' ')[0];

			if (first === 'begsent' && this.state.ngrams[b] > 1)
				possiblewords.push(b);
		}

		return this.randomchoice(possiblewords);
	}

	getword(word: string, sentlength: number, length: number) {
		let possiblewords: String[] = new Array();
		let newword: String,
			first: String = '';

		for (let b in this.state.ngrams) {
			first = b.split(' ')[0];

			if (first === word && this.state.ngrams[b] > 0) {
				newword = b.split(' ')[0];
				if (sentlength > length - 10 && newword === 'endsent') return '';
				else possiblewords.push(newword);
			}

			if (possiblewords.length == 0) return '';
			else {
				newword = this.randomchoice(possiblewords);
			}
		}

		return '';
	}

	wordgen(length: number) {
		if (this.state.ngrams) {
			const seed: String = this.startsent();
			let sent = seed ? seed.split(' ')[1]: "";

			let nextword = this.getword(sent, 0, length);
			while (nextword !== '' && sent.length < length) {
				sent += ' ' + nextword;
				nextword = this.getword(nextword, sent.length, length);
			}

			// TO DO: implement too many @s
			console.log('wordgen called');
			return sent;
        }
        return "";
	}

	render() {
		const tweet = this.wordgen(140);
		// const cityngrams= JSON.parse(data);
		return (
			<div className="App">
				hi
				{tweet}
			</div>
		);
	}
}

export default Tweeta;
