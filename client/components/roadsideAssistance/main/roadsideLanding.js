import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
  } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import MapView from 'react-native-maps';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Rating } from 'react-native-ratings';
import GetLocation from 'react-native-get-location';



const { width, height } = Dimensions.get("window");

class RoadsideAssistanceLandingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        region: {
            latitude: 37.78825,
            longitude: -82.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        ready: false,
        entries: [{
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/00df19d3-383f-4f6e-8295-9e91fadd6ea8",
            title: "AAA Brooklyn",
            rating: 4.3
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/0b9862a5-0cb8-46dc-86e9-2d4fc2a79113",
            title: "Caton towing",
            rating: 4.8
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/01daf2bb-4094-4bd4-b35f-b80ed4be3453",
            title: "Louie Bushwick",
            rating: 3.2
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/065d06d0-3164-4af5-9af5-966665be5185",
            title: "Late Bloomers Towing",
            rating: 2.2
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/0d207231-8244-4023-ae9f-8ec7a43e8521",
            title: "First Choice Towing",
            rating: 5.0
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/14fe428a-e629-4462-86c7-3cc87ec45333",
            title: "Brookyln 24 Hour",
            rating: 1.2
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/1d8f3123-fec7-4d40-b7b1-f148a4b8e8a4",
            title: "Riteway Queens Towing",
            rating: 3.5
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/224fbbb4-8949-41f7-9e77-7f8d27b8336d",
            title: "Maspeth Towing Co.",
            rating: 2.3
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/2315637d-ad10-4df0-9319-bb5411844c36",
            title: "Hook & Go Towing",
            rating: 2.2
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/2e81293f-03c0-4df6-9634-b642d220bda5",
            title: "Mikes Heavy Duty Towing",
            rating: 3.9
        }, {
            thumbnail: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/38e26862-5ebb-4991-872a-3e572cd04f33",
            title: "Jet's Towing Inc.",
            rating: 1.1
        }]
    }
}
    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.overlayyy}>
                    <View style={styles.centered}>
                        <Text style={styles.title} numberOfLines={2}>
                            { item.title }
                        </Text>
                        <Rating
                            type='star'
                            ratingCount={Math.round(item.rating)}
                            imageSize={30} 
                            isDisabled={true}
                            showRating 
                            reviewColor={"gold"} 
                            startingValue={Math.round(item.rating)}
                            count={5} 
                            ratingCount={5} 
                            readonly={true}
                        />
                    </View>
                </View>
            </View>
        );
    }
    componentDidMount() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);

            this.setState({
                region: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                ready: true
            })
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        
    }
    render() {
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Roadside Assistance</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    {this.state.ready === true ? <MapView    
                        style={styles.map}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    /> : null}
                    <View style={styles.marginAbsolute}>
                        <View style={styles.centered}>
                            <AwesomeButtonRick onPress={() => {}} width={width * 0.75} type="secondary">Get immediate assistance</AwesomeButtonRick>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Carousel 
                            containerStyle={styles.sliderSlider}
                            sliderWidth={width}
                            sliderHeight={height * 0.25}
                            itemWidth={width - 100}
                            data={this.state.entries}
                            renderItem={this._renderItem}
                            hasParallaxImages={true}
                        />
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default RoadsideAssistanceLandingHelper;