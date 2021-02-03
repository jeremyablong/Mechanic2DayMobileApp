import React, { Component } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {
    
  }
});
class ProgressiveImage extends Component {
constructor(props) {
    super(props);

    this.thumbnailAnimated = new Animated.Value(0);
    this.imageAnimated = new Animated.Value(0);
}
    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
        toValue: 1,
        }).start();
    }
    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
        toValue: 1,
        }).start();
    }
    render() {
      const {
        thumbnailSource,
        source,
        style,
        ...props
      } = this.props;
      return (
        <View style={{ maxHeight: this.props.height, maxWidth: this.props.width, backgroundColor: '#e1e4e8' }}>
            <Animated.Image
                {...props}
                source={thumbnailSource}
                style={[style, { opacity: this.thumbnailAnimated }]}
                onLoad={this.handleThumbnailLoad}
                blurRadius={1}
            />
            <Animated.Image
                {...props}
                source={source}
                style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
                onLoad={this.onImageLoad}
            />
      </View>
      );
    }
  }
export default ProgressiveImage;
