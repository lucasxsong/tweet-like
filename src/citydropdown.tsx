// import React from 'react';
import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import cities from './dropdowncities.json';

export interface Props {
	onSelection: any;
}

export interface State {}

class CityDropdown extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event: any, data: any) {
		this.props.onSelection(data.value);
	}

	render() {
		return (
			<Dropdown
				button
				className="icon"
				floating
				labeled
				icon="point"
				options={cities}
				search
                placeholder=""
                onChange={this.handleChange}
				style={{
					fontSize: '18px',
					marginLeft: '10px',
					backgroundColor: '#486983b4',
					color: '#e1e8ed',
				}}
			/>
		);
	}
}

export default CityDropdown;
