# react-native-image-slider
* This package is a fork of [I'm an inline-style link](https://github.com/PaulBGD/react-native-image-slider)
* We simplified how the scrollview works and now it does not use PanResponders, just a plain ScrollView.
* This fixes an issue with android that will prevent the scroll to work as a paginated ScrollView, and other small issues.
* Now you can pass your own image component, this is very useful if you are using cached images or another type of image component.

![GIF](final.gif)

## Installation

```bash
npm install --save https://github.com/indesignlatam/react-native-image-slider.git
```

## Usage

```javascript
import ImageSlider from 'react-native-image-slider';

// ...

render() {
    return (
        <ImageSlider images={[
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any'
        ]}/>
    );
}
```

To keep the height from shifting, we use a static height.
If you want to change the height, simply pass a height to the component.

### Props

* `height`: controls the height. By default the height is static, is this if you want the height to change
* `onPositionChanged`: called when the current position is changed
* `position`: used for controlled components
* `onPress`: returns an object with image url and index of image pressed
* `style`: add custom styles
* `imageComponent`: custom image component, useful if you are using a cached image
* `defaultSource`: standard defaultSource Image prop
* `resizeMode`: standard resizeMode Image prop
* `activeOpacity`: opacity of the ImageSlider when touched
* `buttonStyles`: add custom styles to the pagination bullets
* `activeButtonStyles`: add custom styles to the selected pagination bullet

### Autoplay Example

```javascript
class SliderTests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null
        };
    }

    componentWillMount() {
        this.setState({ interval: setInterval(() => {
            this.setState({ position: this.state.position === 2 ? 0 : this.state.position + 1 });
        }, 2000) });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <View style={ styles.container }>
                <ImageSlider
                    images={[
                        `http://placeimg.com/640/480/any`,
                        `http://placeimg.com/640/480/any`,
                        `http://placeimg.com/640/480/any`,
                    ]}
                    position={ this.state.position }
                    onPositionChanged={ position => this.setState({position}) }/>
            </View>
        );
    }
}
```

## To Do

Please feel free to fork and PR!

## License

MIT
