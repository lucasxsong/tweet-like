import * as React from 'react';
import './App.css';

interface Props {
	city: string;
}
interface States {}

class Tweeta extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
    }
    
    

	render() {
        const filename = 'data/ngramsbycity/' + this.props.city;
		fetch(filename)
			.then((r:any) => r.json())
			.then((text:any) => {
				console.log('text', text);
			});
		// const cityngrams= JSON.parse(data);
		return (
			<div className="App">
				hi
				{this.props.city}
			</div>
		);
	}
}

export default Tweeta;
