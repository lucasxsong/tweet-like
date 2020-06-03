// import React from 'react';
import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import cities from './data/dropdowncities.json';

export interface Props {
    onSelection: any;
}

export interface State {
}

class CityDropdown extends React.Component<Props, State> {
	constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event: any, data:any){
        this.props.onSelection(data.value)
    };

	render() {
		return (
			<Dropdown
				placeholder="Select City"
				fluid
				search
				selection
				options={cities}
				onChange={this.handleChange}
			/>
		);
	}
}

export default CityDropdown;
