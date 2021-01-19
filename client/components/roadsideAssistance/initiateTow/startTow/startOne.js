import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles.js";
import { connect } from "react-redux";
import axios from "axios";
import { Config } from "react-native-config";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, List, ListItem, Thumbnail } from 'native-base';
import MapView, { Polyline, Marker } from 'react-native-maps';
import moment from 'moment';
import _ from "lodash";

class StartTwoServicesOneHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: this.props.props.route.params.tow_services,
        routes: null,
        passed: null,
        location: null
    }
}
    componentDidMount() {
        const { data } = this.state

        console.log("CDM data:", data);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (data.tow_required === true) {
            // tow REQUIRED
            if (_.has(data.initial_location, "verticalAccuracy")) {
                axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${data.initial_location.latitude},${data.initial_location.longitude}:${data.tow_desination_information.position.lat},${data.tow_desination_information.position.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                    console.log("MAGICAL SHIT:", res.data);
                    
                    const { routes } = res.data;
    
                    this.setState({
                        routes: routes[0],
                        passed: "used-location-button"
                    })
                }).catch((err) => {
                    console.log(err);
                })
            } else if (_.has(data.initial_location, "position")) {
                axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${data.initial_location.position.lat},${data.initial_location.position.lon}:${data.tow_desination_information.position.lat},${data.tow_desination_information.position.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                    console.log("MAGICAL SHIT:", res.data);
                    
                    const { routes } = res.data;
    
                    this.setState({
                        routes: routes[0],
                        passed: "manually-entered-addresses"
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else {
            // tow NOT required
            if (_.has(data.initial_location, "position")) {
                const headers = {
                    params: {
                        key: Config.mapquest_api_key,
                        location: `${data.initial_location.position.lat},${data.initial_location.position.lon}`
                    }
                };
                axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                    console.log(res.data);

                    if (res.data) {
                        this.setState({
                            location: `${res.data.results[0].locations[0].street}, ${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                const headers = {
                    params: {
                        key: Config.mapquest_api_key,
                        location: `${data.initial_location.latitude},${data.initial_location.longitude}`
                    }
                };
                axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                    console.log(res.data);

                    if (res.data) {
                        this.setState({
                            location: `${res.data.results[0].locations[0].street}, ${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    renderMap = () => {
        const { passed, data, routes } = this.state;

        if (data.tow_required === true) {
            if (routes !== null) {
                const points = routes.legs[0].points;

                if (passed === "manually-entered-addresses") {
                    return (
                        <MapView    
                            style={styles.map}
                            initialRegion={{
                                latitude: data.initial_location.position.lat,
                                longitude: data.initial_location.position.lon,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker 
                                coordinate={{ latitude: data.initial_location.position.lat, longitude: data.initial_location.position.lon }} 
                            />
                            <Marker coordinate={{ latitude: data.tow_desination_information.position.lat, longitude: data.tow_desination_information.position.lon }}>
                                <Image  
                                    source={require("../../../../assets/icons/finish.png")}
                                    style={{ width: 32, height: 32 }}
                                    resizeMode="contain"
                                />
                            </Marker>                         
                            <Polyline
                                coordinates={points}
                                strokeWidth={4} 
                                strokeColor={"blue"}
                            />
                        </MapView>
                    );
                } else if (passed === "used-location-button") {
                    return (
                        <MapView    
                            style={styles.map}
                            initialRegion={{
                                latitude: data.initial_location.latitude,
                                longitude: data.initial_location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker 
                                coordinate={{ latitude: data.initial_location.latitude, longitude: data.initial_location.longitude }} 
                            />
                            <Marker coordinate={{ latitude: data.tow_desination_information.position.lat, longitude: data.tow_desination_information.position.lon }}>
                                <Image  
                                    source={require("../../../../assets/icons/finish.png")}
                                    style={{ width: 32, height: 32 }}
                                    resizeMode="contain"
                                />
                            </Marker>  
                            <Polyline
                                coordinates={points}
                                strokeWidth={4} 
                                strokeColor={"blue"}
                            />
                        </MapView>
                    );
                }
            }
        } else {
            if (_.has(data.initial_location, "verticalAccuracy")) {
                return (
                    <MapView    
                        style={styles.map}
                        initialRegion={{
                            latitude: data.initial_location.latitude,
                            longitude: data.initial_location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude : data.initial_location.latitude, longitude : data.initial_location.longitude }}
                            image={require("../../../../assets/icons/car-marker.png")}
                        />
                    </MapView>
                );
            } else {
                return (
                    <MapView    
                        style={styles.map}
                        initialRegion={{
                            latitude: data.initial_location.position.lat,
                            longitude: data.initial_location.position.lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude : data.initial_location.position.lat, longitude : data.initial_location.position.lon }}
                            image={require("../../../../assets/icons/car-marker.png")}
                        />
                    </MapView>
                );
            }
        }
    }
    handleCapturePayment = () => {
        console.log("handleCapturePayment clicked");

        // axios.post(`${Config.ngrok_url}/take/payment/paypal/capture`).then((res) => {
        //     if (res.data.message === "") {
        //         console.log(res.data);
        //     } else {
        //         console.log("Err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    renderConditional = () => {
        const { data, routes, location } = this.state;

        if (data.tow_required === true && routes !== null) {
            const arrival = routes.summary.arrivalTime;
            const departure = routes.summary.departureTime;
            return (
                <View style={styles.margin}>
                    <Text style={styles.header}><Text style={{ fontWeight: "bold" }}>Tow Desination:</Text> {data.tow_destination}</Text>
                    <List>
                        <ListItem avatar>
                        <Left>
                            <Thumbnail source={require("../../../../assets/icons/car.png")} />
                        </Left>
                        <Body>
                            <NativeText>Total Transit Time</NativeText>
                            <NativeText>{Math.floor(routes.summary.travelTimeInSeconds / 60)} Minutes</NativeText>
                        </Body>
                        
                        </ListItem>
                    </List>
                    <View style={styles.topBottomMargin}>
                        <Text>Depature Time: {moment(departure).format("MMMM Do YYYY, h:mm:ss a")}</Text>
                        <Text style={{ marginTop: 10 }}>Arrival Time: {moment(arrival).format("MMMM Do YYYY, h:mm:ss a")}</Text>
                    </View>
                    {this.renderMap()}
                </View>
            );
        } else {
            return (
                <View style={styles.margin}>
                    <Text style={styles.header}><Text style={{ fontWeight: "bold" }}>Assistance Location:</Text> {location}</Text>
                    <Text style={{ marginTop: 10, fontStyle: 'italic' }}>Exact coordinates will be given to the driver.</Text>
                    <List>
                        <ListItem avatar>
                        <Left>
                            <Thumbnail source={require("../../../../assets/icons/car.png")} />
                        </Left>
                        <Body>
                            <NativeText>Requested Service: </NativeText>
                            <NativeText style={{ fontWeight: "bold" }}>{this.calculateType(data.roadside_service_required)}</NativeText>
                        </Body>
                        
                        </ListItem>
                    </List>
                    <View style={styles.topBottomMargin}>
                       
                    </View>
                    {this.renderMap()}

                    <View style={[styles.centered, { marginTop: 25 }]}>
                        <View style={styles.centered}>
                            <Button info onPress={() => {
                                this.handleCapturePayment();
                            }} style={styles.customButton}>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Initiate Roadside Assistance</NativeText>
                            </Button>
                        </View>
                    </View>
                </View>
            );
        }
    }
    calculateType = (passed) => {
        switch (passed) {
            case "door-unlocking":
                return "Door Unlocking Services";
                break;
            case "gas-delivery":
                return "Gas Top-Off / Delivery";
                break;
            case "tire-change": 
                return "Tire Change";
                break;
            case "stuck-vehicle":
                return "Remove Stuck Vehicle";
                break;
            case "jump-start":
                return "Jump Start Vehicle";
                break;
            default:
                break;
        }
    }
    render() {
        console.log("this.PROPS startTwoServicesOne", this.props);
        console.log("this.STATE startOne.js", this.state);

        const { data } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tow Initiation</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("homepage-main");
                        }} transparent>
                            <Text style={{ fontSize: 18 }}>Exit</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    {this.renderConditional()}
                </ScrollView>
            </Fragment>
        )
    }
}
export default StartTwoServicesOneHelper;