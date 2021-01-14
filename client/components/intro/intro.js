import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, ImageBackground, Image } from "react-native";
import styles from "./styles.js";
import { authenticated } from "../../actions/signup/auth.js";
import { connect } from "react-redux";


const slides = [
  {
    key: 1,
    title: 'Affordable and reliable auto repairs!',
    text: 'Quality repairs from your local neighbors all through ONE central app! Our mechanics are your friends, family and neighbors - now thats trustworthy.',
    image: require('../../assets/images/onboarding/one.jpg'),
    backgroundColor: '#59b2ab',
    innerBackground: require('../../assets/images/onboarding/one.jpg')
  },
  {
    key: 2,
    title: 'Any Location - Any Time - Any Day.',
    text: 'We will come to you at any time on any day at any time! 24/7 auto repairs and breakdown service at your fingertips - literally!',
    image: require('../../assets/images/onboarding/two.jpg'),
    backgroundColor: '#febe29',
    innerBackground: require('../../assets/images/onboarding/two.jpg')
  },
  {
    key: 3,
    title: 'We will come to you!',
    text: 'Our network of certified mechanics will come to you and do the repair from the comfort of your home! Quicker "expedited" services avaliable for a fee.',
    image: require('../../assets/images/onboarding/three.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/onboarding/three.jpg')
  },
  {
    key: 4,
    title: 'Affordable and reliable auto repairs!',
    text: 'Quality repairs from your local neighbors all through ONE central app! Our mechanics are your friends, family and neighbors - now thats trustworthy.',
    image: require('../../assets/images/onboarding/four.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/onboarding/four.jpg')
  },
  {
    key: 5,
    title: 'Any Location - Any Time - Any Day.',
    text: 'We will come to you at any time on any day at any time! 24/7 auto repairs and breakdown service at your fingertips - literally!',
    image: require('../../assets/images/onboarding/five.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/onboarding/five.jpg')
  },
  {
    key: 6,
    title: 'Lorem ipsum dolor sit amet, consectetur',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In metus ante, scelerisque vel viverra ac, volutpat mattis turpis',
    image: require('../../assets/images/onboarding/six.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/onboarding/six.jpg')
  },
  {
    key: 7,
    title: 'We will come to you!',
    text: 'Our network of certified mechanics will come to you and do the repair from the comfort of your home! Quicker "expedited" services avaliable for a fee.',
    image: require('../../assets/images/onboarding/seven.jpg'),
    backgroundColor: '#22bcb5',
    innerBackground: require('../../assets/images/onboarding/seven.jpg')
  }
];
 
class IntroSlider extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        showRealApp: false
    }
}
  _renderItem = ({ item }) => {
    return (
      <ImageBackground resizeMode={"cover"} source={item.image} style={styles.slide}>
          <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.hr} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
      </ImageBackground>
    );
  }
  _onDone = () => {

    this.props.authenticated({
      page: 1
    })

    setTimeout(() => {
      this.props.navigation.navigate("homepage-main");
    }, 500);
  }
  render() {
      return (
        <Fragment>
          <AppIntroSlider bottomButton={true} renderItem={this._renderItem} data={slides} onDone={this._onDone}/>
        </Fragment>
      );
    }
}
export default connect(null, { authenticated })(IntroSlider);