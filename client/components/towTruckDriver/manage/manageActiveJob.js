import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Linking } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import { connect } from "react-redux";
import { Config } from "react-native-config";
import axios from "axios";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import MapView, { Polyline, Marker } from 'react-native-maps';
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import _ from "lodash";
import Dialog from "react-native-dialog";
import io from 'socket.io-client';

const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});

const { height, width } = Dimensions.get("window");

class ManageActiveJobRoadsideAssistanceManageJobHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        roadside: null,
        dropoff_location: null,
        dropoff_location_street: "",
        current_location: null,
        routes: null,
        passed: "",
        ready: false,
        my_location: {},
        isVisible: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log("Ta-dah!:", res.data);

                const { user } = res.data;

                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                if (_.has(user.active_roadside_assistance_job, "dropoff_location")) {
                    // tow REQUIRED
                    if (_.has(user.active_roadside_assistance_job.dropoff_location, "verticalAccuracy")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_job.dropoff_location.latitude},${user.active_roadside_assistance_job.dropoff_location.longitude}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                            console.log("MAGICAL SHIT:", res.data);
                            
                            const { routes } = res.data;
            
                            this.setState({
                                routes: routes[0],
                                passed: "used-location-button",
                                ready: true,
                                my_location: {
                                    latitude: user.current_location.coords.latitude,
                                    longitude: user.current_location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else if (_.has(user.active_roadside_assistance_job.dropoff_location, "position")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_job.dropoff_location.position.lat},${user.active_roadside_assistance_job.dropoff_location.position.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
                            console.log("MAGICAL SHIT:", res.data);
                            
                            const { routes } = res.data;
            
                            this.setState({
                                routes: routes[0],
                                passed: "manually-entered-addresses",
                                ready: true,
                                my_location: {
                                    latitude: user.current_location.coords.latitude,
                                    longitude: user.current_location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }

                this.setState({
                    user,
                    roadside: user.active_roadside_assistance_job,
                    dropoff_location: user.active_roadside_assistance_job.dropoff_location,
                    dropoff_location_street: user.active_roadside_assistance_job.dropoff_location_street,
                    current_location: user.current_location
                })
            } else {
                console.log("Errr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    getNavigationalDirectionsDropoff = () => {
        console.log("getNavigationalDirectionsDropoff clicked");

        const { user } = this.state;

        if (_.has(user.active_roadside_assistance_job, "dropoff_location")) {
            // tow REQUIRED
            if (_.has(user.active_roadside_assistance_job.dropoff_location, "verticalAccuracy")) {
                const URL = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${user.active_roadside_assistance_job.dropoff_location.latitude},${user.active_roadside_assistance_job.dropoff_location.longitude}`;

                Linking.canOpenURL(URL).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle URL: ' + URL);
                    } else {
                        return Linking.openURL(URL);
                    }
                }).catch(err => console.error('An error occurred', err));
                
            } else if (_.has(user.active_roadside_assistance_job.dropoff_location, "position")) {
                const URL = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${user.active_roadside_assistance_job.dropoff_location.position.lat},${user.active_roadside_assistance_job.dropoff_location.position.lon}`;

                Linking.canOpenURL(URL).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle URL: ' + URL);
                    } else {
                        return Linking.openURL(URL);
                    }
                }).catch(err => console.error('An error occurred', err)); 
            }
        }
    }
    renderMarker = () => {
        const { user } = this.state;

        if (_.has(user.active_roadside_assistance_job, "dropoff_location")) {
            if (_.has(user.active_roadside_assistance_job.dropoff_location, "verticalAccuracy")) {
                return (
                    <Marker 
                        coordinate={{ 
                            latitude: user.active_roadside_assistance_job.dropoff_location.latitude, 
                            longitude: user.active_roadside_assistance_job.dropoff_location.longitude 
                        }}
                        ref={(marker) => this.marker = marker}
                    >
                        <Image source={require("../../../assets/icons/finish.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                    </Marker>
                );
            } else if (_.has(user.active_roadside_assistance_job.dropoff_location, "position")) {
                return (
                    <Marker 
                        coordinate={{ 
                            latitude: user.active_roadside_assistance_job.dropoff_location.position.lat, 
                            longitude: user.active_roadside_assistance_job.dropoff_location.position.lon
                        }}
                        ref={(marker) => this.marker = marker}
                    >
                        <Image source={require("../../../assets/icons/finish.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                    </Marker>
                );
            }
        }
    }
    renderConditional = () => {
        const { roadside, ready, routes, my_location } = this.state;

        if (ready === true) {
            if (roadside !== null && roadside.dropoff_location === "tow-not-required") {
                return (
                    <Fragment>
                        <View style={styles.margin}>
                            <Text style={styles.header}>DROP-OFF is NOT required.</Text>
                            <Text style={{ fontSize: 16, fontStyle: "italic" }}>You can manage your job here regarding completing the roadside claim, contact support, and much more...</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.margin}>
                            <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {}}>Complete trip & accept payment</AwesomeButtonBlue>
                            <View style={styles.hr} />
                            <AwesomeButtonBlue width={width * 0.90} textColor={"white"} type="primary" onPress={() => {}}>Contact Support</AwesomeButtonBlue>
                            <View style={styles.hr} />
                            <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {}}>Manage Trip</AwesomeButtonBlue>
                        </View>
                        <View style={styles.hr} />
                    </Fragment>
                );
            } else {
                const points = routes.legs[0].points;
                return (
                    <Fragment>
                        <View style={styles.mapboxArea}>
                            <MapView    
                                showsUserLocation={true}
                                showsCompass={true} 
                                showsMyLocationButton={true}
                                style={styles.map}
                                initialRegion={my_location}
                            >
                                <Polyline
                                    coordinates={points}
                                    strokeWidth={7} 
                                    strokeColor={"blue"}
                                />  
                                {this.renderMarker()}
                            </MapView>
                            <View style={styles.absoluteOverlay}>
                                <Text style={styles.mapTitle}>DROP-OFF is REQUIRED.</Text>  
                            </View>
                            <View style={styles.circle}>
                                <TouchableOpacity ref={(touchable) => this.touchable = touchable} onPress={() => {
                                    this.RBSheet.open();
                                }}>
                                    <Image source={require("../../../assets/icons/gps.png")} style={{ maxWidth: "80%", maxHeight: "80%", marginTop: 10 }} />
                                </TouchableOpacity>
                                
                            </View>
                        </View> 
                    </Fragment>
                );
            }
        }
    }
    markTripAsCompleted = () => {
        console.log("markTripAsCompleted clicked");

        const { roadside } = this.state;

        axios.post(`${Config.ngrok_url}/mark/tow/driver/trip/complete`, {
            id: this.props.unique_id,
            fullName: this.props.fullName,
            other_user_id: roadside.requestee_id
        }).then((res) => {
            if (res.data.message === "Updated account and marked trip as complete for tow truck driver and notifed other user!") {
                console.log(res.data);

                socket.emit("delivered-successfully", {
                    delivered: true,
                    user_id: roadside.requestee_id
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("driver-has-arrived-manage-listing-depatarture");
                }, 1500)
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("this.state manageActiveJob.js state", this.state);
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
                        <Title>Drop-off</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <NativeText>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    {this.renderConditional()}
                </ScrollView>
                <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>Are you sure you would like to complete this trip?</Dialog.Title>
                    <Dialog.Description>
                        You cannot undo this action and the other user has to confirm before proceeding... are you sure you'd like to mark this trip as "complete"?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            this.markTripAsCompleted();
                        })
                    }} label="COMPLETE!" />
                    </Dialog.Container>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={305}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                    >
                        <View style={styles.topAndBottomMargin}>
                            <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {
                                this.RBSheet.close();

                                setTimeout(() => {
                                    this.getNavigationalDirectionsDropoff();
                                }, 750);
                            }}>Get navigational directions</AwesomeButtonBlue>
                        </View>
                        <View style={styles.topAndBottomMargin}>
                            <AwesomeButtonBlue width={width * 0.90} textColor={"white"} type="primary" onPress={() => {
                                this.RBSheet.close();

                                setTimeout(() => {
                                    this.setState({
                                        isVisible: true
                                    })
                                }, 750);
                            }}>Complete trip/Reached destination</AwesomeButtonBlue>
                        </View>
                        <View style={styles.topAndBottomMargin}>
                            <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {}}>Cancel trip</AwesomeButtonBlue>
                            <Text style={styles.warningText}>*Penalties apply to <Text style={{ textDecorationLine: "underline"}}>all cancellations</Text>*</Text>
                        </View>
                </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        fullName: state.auth.authenticated.fullName
    }
}
export default connect(mapStateToProps, { })(ManageActiveJobRoadsideAssistanceManageJobHelper);