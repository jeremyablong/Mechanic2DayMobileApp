import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    Animated,
    Image,
    Dimensions
  } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import MapView, { Marker } from 'react-native-maps';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Rating } from 'react-native-ratings';
import GetLocation from 'react-native-get-location';
import { connect } from "react-redux";
import axios from "axios";
import { Config } from "react-native-config";

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
        entries: []
    }
}
    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.company_image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.overlayyy}>
                    <View style={styles.centered}>
                        <Text style={styles.title} numberOfLines={2}>
                            { item.company_name }
                        </Text>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={30} 
                            isDisabled={true}
                            showRating 
                            reviewColor={"gold"} 
                            startingValue={5}
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

        axios.get(`${Config.ngrok_url}/gather/roadside/assistance/listings`).then((res) => {
            if (res.data.message === "Successfully gathered roadside listings!") {
                console.log(res.data);

                const { listings } = res.data;

                this.setState({ 
                    entries: listings
                }, () => {
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
            
                        console.log("code", code, "message", message);
            
                        this.setState({
                            ready: true
                        })
                    })
                })
            } else {
                console.log("err", res.data);

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

                    console.log("code", code, "message", message);

                    this.setState({
                        ready: true
                    })
                })
            }
        }).catch((err) => {
            console.log(err);
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
                        {this.props.accountType === "mechanic" ? <Button onPress={() => {
                            this.props.props.navigation.navigate("advertise-create-address-preview");
                        }} transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button> : null}
                    </Right>
                </Header>
                <View style={styles.container}>
                    {this.state.ready === true ? <MapView    
                        style={styles.map}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    > 
                        {this.state.entries.map((listing, index) => {
                            return <Marker coordinate={{
                                latitude: listing.location.position.lat,
                                longitude: listing.location.position.lon
                            }} />;
                        })}
                    </MapView> : null}
                    <View style={styles.marginAbsolute}>
                        <View style={styles.centered}>
                            <AwesomeButtonRick textColor={"black"} onPress={() => {}} width={width * 0.75} type="secondary">Get immediate assistance</AwesomeButtonRick>
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
const mapStateToProps = (state) => {
    return {
        accountType: state.auth.authenticated.accountType
    };
}
export default connect(mapStateToProps, { })(RoadsideAssistanceLandingHelper);