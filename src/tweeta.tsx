import * as React from 'react';
import './App.css';

interface Props {
	city: string;
}
interface States {
	ngrams: any;
}

class Tweeta extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		const filename = 'data/ngramsbycity/' + this.props.city;
		fetch(filename)
			.then((r: any) => r.json())
			.then((text: any) => {
				this.setState({ ngrams: text });
			});
	}

	startSent() {
		for (let key in this.state.ngrams) {
			console.log(key);
		}
	}

	render() {
		// const cityngrams= JSON.parse(data);
		return (
			<div className="App">
				hi
				{this.props.city}
				{this.startSent}
			</div>
		);
	}
}

export default Tweeta;
