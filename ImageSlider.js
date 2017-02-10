import React, { Component } from 'react';
import {
	View,
	Image,
	Animated,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

import styles from './styles.js';


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
		const width = this.props.width || this.state.width;
		const index = Math.round(contentOffset.x / width);

		this._move(index);
	}

	render() {
		const width = this.state.width;
		const height = this.props.height || this.state.height;
		const position = this._getPosition();
		const ImageComponent = this.props.imageComponent || Image;
		const activeButtonStyles = this.props.activeButtonStyles || styles.buttonSelected ;

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
								resizeMode={ this.props.resizeMode || 'cover' }
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
							<View
								key={ index }
								underlayColor={ '#ccc' }
								style={[
									this.props.buttonStyles || styles.button,
									(position === index) ? activeButtonStyles : null,
								]}>
								<View></View>
							</View>
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
