import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {
    BarIndicator
} from 'react-native-indicators';

class Loading extends Component {
constructor () {
	super();

	this.state = {
		loading: true
	}
}
	render() {
		return (
			<View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
				<View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
					<BarIndicator count={14} color='blue' />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	text: {
		fontSize: 100
	}
});

export default Loading;