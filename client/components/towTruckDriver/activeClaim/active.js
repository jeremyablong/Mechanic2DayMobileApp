import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from './styles.js';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import _ from "lodash";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

const { width, height } = Dimensions.get("window");

class ManageActiveJobClaimHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [],
        user: null,
        region: {},
        ready: false,
        routes: null,
        passed: ""
    }
}
    componentDidMount() {
        console.log("mounted.");

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log(res.data);

                const { user } = res.data;

                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                this.setState({
                    user,
                    region: {
                        latitude: user.current_location.coords.latitude,
                        longitude: user.current_location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                })
                if (_.has(user.active_roadside_assistance_jobs, "dropoff_location")) {
                    // tow REQUIRED
                    if (_.has(user.active_roadside_assistance_jobs.pickup_location, "verticalAccuracy")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_jobs.pickup_location.lat},${user.active_roadside_assistance_jobs.pickup_location.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                            console.log("MAGICAL SHIT:", res.data);
                            
                            const { routes } = res.data;
            
                            this.setState({
                                routes: routes[0],
                                passed: "used-location-button",
                                ready: true
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else if (_.has(user.active_roadside_assistance_jobs.pickup_location, "position")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_jobs.pickup_location.position.lat},${user.active_roadside_assistance_jobs.pickup_location.position.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                            console.log("MAGICAL SHIT:", res.data);
                            
                            const { routes } = res.data;
            
                            this.setState({
                                routes: routes[0],
                                passed: "manually-entered-addresses",
                                ready: true
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            } else {
                console.log("errrrroorrr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditionalContent = () => {
        const { ready, routes } = this.state;

        if (ready === true) {

            const points = routes.legs[0].points;

            return (
                <MapView    
                    showsCompass={true} 
                    showsPointsOfInterest={true} 
                    showsUserLocation={true} 
                    showsTraffic={true}
                    style={styles.map}
                    initialRegion={this.state.region}
                >
                    <View style={styles.centered}>
                        <View style={styles.centered}>
                            <AwesomeButtonCartman textColor={"white"} type="anchor" onPress={() => {}} width={width * 0.75}>Get Navigational Directions To User</AwesomeButtonCartman>
                        </View>
                    </View>
                    <Polyline
                        coordinates={points}
                        strokeWidth={4} 
                        strokeColor={"blue"}
                    />
                </MapView>
            );
        } else {
            return null;
        }
    }
    render() {
        console.log("activeClaim active.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Directions</Title>
                        <Subtitle>This is an ACTIVE job...</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent>
                        <NativeText>Help?</NativeText>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    {this.renderConditionalContent()}
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ManageActiveJobClaimHelper);