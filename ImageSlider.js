import React, { Component } from 'react';
import {
	Image,
	View,
	ScrollView,
	StyleSheet,
	Animated,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions
} from 'react-native';


const styles = StyleSheet.create({
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

export default class ImageSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			position: 0,
			height: Dimensions.get('window').width * (4 / 9),
			width: Dimensions.get('window').width,
			scrolling: false,
		};

		this._handleScrollEnd = debounce(this._handleScrollEnd.bind(this), 100).bind(this);
	}

	_onRef(ref) {
		this._ref = ref;
		if(ref && this.state.position !== this._getPosition()){
			this._move(this._getPosition());
		}
	}

	_move(index) {
		const isUpdating = index !== this._getPosition();
		const x = this.state.width * index;

		this._ref.scrollTo({ x: this.state.width * index, y: 0, animated: true });
		this.setState({ position: index });

		if(isUpdating && this.props.onPositionChanged){
			this.props.onPositionChanged(index);
		}
	}

	_getPosition() {
		if(typeof this.props.position === 'number'){
			return this.props.position;
		}
		return this.state.position;
	}

	componentDidUpdate(prevProps) {
		if(prevProps.position !== this.props.position){
			this._move(this.props.position);
		}
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}


	_handleScroll(event) {
		this._handleScrollEnd(event.nativeEvent.contentOffset);
	}

	_handleScrollEnd(contentOffset) {
		const width = this.props.width || this.state.width

		const index = Math.round(contentOffset.x / width)

		this._move(index)
	}

	render() {
		const width = this.state.width;
		const height = this.props.height || this.state.height;
		const position = this._getPosition();
		const ImageComponent = this.props.imageComponent || Image;

		return (
			<View>
				<ScrollView
					ref={ ref => this._onRef(ref) }
					decelerationRate={ 0.99 }
					horizontal={ true }
					pagingEnabled={ true }
					onScroll={ (event) => this._handleScroll(event) }
					scrollEventThrottle={ 16 }
					showsHorizontalScrollIndicator={ false }
					style={[ styles.container, this.props.style, { height: height } ]}>
					{
						this.props.images.map((image, index) => {
							const imageObject = typeof image === 'string' ? { uri: image } : image;
							const imageComponent = <ImageComponent
								key={ index }
								source={ imageObject }
								defaultSource={ this.props.defaultSource }
								style={{ height, width }} />;

							if (this.props.onPress) {
								return (
									<TouchableOpacity
										key={ index }
										style={{ height, width }}
										onPress={ () => this.props.onPress({ image, index }) }
										delayPressIn={ 200 }
										activeOpacity={ this.props.activeOpacity || 0.7 }>
										{ imageComponent }
									</TouchableOpacity>
								);
							} else {
								return imageComponent;
							}
						})
					}
				</ScrollView>

				<View style={ styles.buttons }>
					{
						this.props.images.map((image, index) =>
							<TouchableHighlight
								key={ index }
								underlayColor={ '#ccc' }
								onPress={ () => this._move(index) }
								style={[ styles.button, position === index && styles.buttonSelected ]}>
								<View></View>
							</TouchableHighlight>
						)
					}
				</View>
			</View>
		);
	}
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
