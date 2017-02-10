/**
 * Images Slider styles - Indesign Colombia ®
 * http://indesign.com.co
 * @paulo.mogollon
 */

import React from 'react';
import {
	StyleSheet,
	Dimensions
} from 'react-native';


export default styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#222'
	},
	buttons: {
		height: 15,
		marginTop: -15,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	button: {
		margin: 3,
		width: 8,
		height: 8,
		borderRadius: 8 / 2,
		backgroundColor: '#ccc',
		opacity: 0.9
	},
	buttonSelected: {
		opacity: 1,
		backgroundColor: '#fff',
	}
});
