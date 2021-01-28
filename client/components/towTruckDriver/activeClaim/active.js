import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, Linking } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from './styles.js';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import _ from "lodash";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import geodist from "geodist";
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";
import Dialog from "react-native-dialog";
import io from 'socket.io-client';

const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});


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
        passed: "",
        myLocation: null,
        isVisible: false,
        isVisibleConfirm: false
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
                    },
                    myLocation: {
                        latitude: user.current_location.coords.latitude,
                        longitude: user.current_location.coords.longitude
                    }
                })
                if (_.has(user.active_roadside_assistance_job, "pickup_location")) {
                    // tow REQUIRED
                    if (_.has(user.active_roadside_assistance_job.pickup_location, "verticalAccuracy")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_job.pickup_location.latitude},${user.active_roadside_assistance_job.pickup_location.longitude}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
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
                    } else if (_.has(user.active_roadside_assistance_job.pickup_location, "position")) {
                        axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${user.active_roadside_assistance_job.pickup_location.position.lat},${user.active_roadside_assistance_job.pickup_location.position.lon}/json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, config).then((res) => {
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
    getNavigationalDirectionsPickup = () => {
        console.log("getNavigationalDirectionsPickup clicked");

        const { user } = this.state;

        if (_.has(user.active_roadside_assistance_job, "pickup_location")) {
            // tow REQUIRED
            if (_.has(user.active_roadside_assistance_job.pickup_location, "verticalAccuracy")) {
                const URL = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${user.active_roadside_assistance_job.pickup_location.latitude},${user.active_roadside_assistance_job.pickup_location.longitude}`;

                Linking.canOpenURL(URL).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle URL: ' + URL);
                    } else {
                        return Linking.openURL(URL);
                    }
                }).catch(err => console.error('An error occurred', err));
                
            } else if (_.has(user.active_roadside_assistance_job.pickup_location, "position")) {
                const URL = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${user.active_roadside_assistance_job.pickup_location.position.lat},${user.active_roadside_assistance_job.pickup_location.position.lon}`;

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
    notfiyOfArrival = () => {
        console.log("notfiyOfArrival clicked.");

        const { myLocation, user } = this.state;

        if (_.has(user.active_roadside_assistance_job, "pickup_location")) {
            // tow REQUIRED
            if (_.has(user.active_roadside_assistance_job.pickup_location, "verticalAccuracy")) {
                console.log("ONE:", geodist({ lat: myLocation.latitude, lon: myLocation.longitude }, {lat: user.active_roadside_assistance_job.pickup_location.latitude, lon: user.active_roadside_assistance_job.pickup_location.longitude }));

                if (geodist({ lat: myLocation.latitude, lon: myLocation.longitude }, {lat: user.active_roadside_assistance_job.pickup_location.latitude, lon: user.active_roadside_assistance_job.pickup_location.longitude }) <= 1.5) {
                    axios.post(`${Config.ngrok_url}/notifiy/of/arrival/tow/driver`, {
                        id: this.props.unique_id,
                        location: myLocation
                    }).then((res) => {
                        if (res.data.message === "Notified other user successfully and both users have agreed the driver has arrived!") {

                            console.log(res.data);

                            socket.emit("approve-next-page", {
                                approved: true,
                                user_id: user.active_roadside_assistance_job.requestee_id
                            })

                            setTimeout(() => {
                                this.props.props.navigation.replace("settings-active-roadside-assistance-manage");
                            }, 1000)

                        } else if (res.data.message === "Only ONE user has agreed that the driver has arrived.") {
                            console.log("Err", res.data);

                            Toast.show({
                                text1: "The client has not confirmed your arrival yet...",
                                text2: "The client hasn't confirmed your arrival. Once they do you will be able to proceed!",
                                visibilityTime: 5500,
                                position: "top",
                                type: "info"
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        isVisible: true
                    })
                }
            } else if (_.has(user.active_roadside_assistance_job.pickup_location, "position")) {
                console.log("TWO:", geodist({ lat: myLocation.latitude, lon: myLocation.longitude }, {lat: user.active_roadside_assistance_job.pickup_location.position.lat, lon: user.active_roadside_assistance_job.pickup_location.position.lon }));

                if (geodist({ lat: myLocation.latitude, lon: myLocation.longitude }, {lat: user.active_roadside_assistance_job.pickup_location.position.lat, lon: user.active_roadside_assistance_job.pickup_location.position.lon }) <= 1.5) {
                    axios.post(`${Config.ngrok_url}/notifiy/of/arrival/tow/driver`, {
                        id: this.props.unique_id,
                        location: myLocation
                    }).then((res) => {
                        if (res.data.message === "Notified other user successfully and both users have agreed the driver has arrived!") {
                            console.log(res.data);

                            socket.emit("approve-next-page", {
                                approved: true,
                                user_id: user.active_roadside_assistance_job.requestee_id
                            })

                            setTimeout(() => {
                                this.props.props.navigation.replace("settings-active-roadside-assistance-manage");
                            }, 1000)

                        } else if (res.data.message === "Only ONE user has agreed that the driver has arrived.") {
                            console.log("Err", res.data);

                            Toast.show({
                                text1: "The client has not confirmed your arrival yet...",
                                text2: "The client hasn't confirmed your arrival. Once they do you will be able to proceed!",
                                visibilityTime: 5500,
                                position: "top",
                                type: "info"
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        isVisible: true
                    })
                }
            }
        } else {
            Toast.show({
                text1: "Critical error occurred...",
                text2: "Cannot find pickup location & can't caculate distance.",
                type: "error",
                visibilityTime: 4500,
                position: "top"
            })
        }
    }
    renderConditionalContent = () => {
        const { ready, routes, user } = this.state;

        if (ready === true && user !== null) {

            const points = routes.legs[0].points;

            return (
                <View style={{ flex: 1 }}>
                    <MapView    
                        showsCompass={true} 
                        showsPointsOfInterest={true}
                        followUserLocation={true} 
                        showsUserLocation={true} 
                        showsTraffic={true}
                        style={styles.map}
                        initialRegion={this.state.region}
                    >
                        
                        <Polyline
                            coordinates={points}
                            strokeWidth={4} 
                            strokeColor={"blue"}
                        />
                        {this.renderMarker()}
                    </MapView>
                    <View style={styles.marginAbsolute}>
                        <View style={styles.centered}>
                        <View style={styles.centered}>
                            <AwesomeButtonBlue backgroundShadow={"#D7BCE8"} width={width * 0.75} type={"primary"} textColor={"white"} onPress={this.getNavigationalDirectionsPickup}>Get navigational directions</AwesomeButtonBlue>
                        </View>
                        </View>
                    </View>
                    <View style={styles.bottomBottom}>
                        <AwesomeButtonBlue width={width * 0.75} type={"secondary"} onPress={() => {
                            this.setState({
                                isVisibleConfirm: true
                            })
                        }}>I have arrived</AwesomeButtonBlue>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.margin}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>You are not actively assigned to a job yet... Make sure your employer as approved you and pick a job when your ready to start making some money!</Text>

                    <View style={[styles.centered, { marginTop: 30 }]}>
                        <View style={styles.centered}>
                            <AwesomeButtonCartman textColor={"white"} type="anchor" onPress={() => {
                                this.props.props.navigation.push("list-roadside-assistance-queue");
                            }} width={width * 0.75}>Redirect to active job queue</AwesomeButtonCartman>
                        </View>
                    </View>
                </View>
            );
        }
    }
    renderMarker = () => {
        const { user } = this.state;

        if (_.has(user.active_roadside_assistance_job, "pickup_location")) {
            if (_.has(user.active_roadside_assistance_job.pickup_location, "verticalAccuracy")) {
                return (
                    <Marker 
                        coordinate={{ 
                            latitude: user.active_roadside_assistance_job.pickup_location.latitude, 
                            longitude: user.active_roadside_assistance_job.pickup_location.longitude 
                        }}
                        ref={(marker) => this.marker = marker}
                    >
                        <Image source={require("../../../assets/icons/finish.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                    </Marker>
                );
            } else if (_.has(user.active_roadside_assistance_job.pickup_location, "position")) {
                return (
                    <Marker 
                        coordinate={{ 
                            latitude: user.active_roadside_assistance_job.pickup_location.position.lat, 
                            longitude: user.active_roadside_assistance_job.pickup_location.position.lon
                        }}
                        ref={(marker) => this.marker = marker}
                    >
                        <Image source={require("../../../assets/icons/finish.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                    </Marker>
                );
            }
        }
    }
    render() {
        console.log("activeClaim active.js", this.state);
        const { isVisibleConfirm } = this.state;
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
                <View>
                    <Modal isVisible={this.state.isVisible}>
                        <View style={styles.modalContent}>
                        <Text style={styles.headerMain}>You are <Text style={{ color: "blue" }}>NOT</Text> close enough to the pickup location!</Text>
                        <View style={styles.hr}/>
                        <Text style={{ textAlign: "center", marginTop: 15, fontWeight: "bold", marginBottom: 20 }}>Please only click "I've arrived" when you've actually arrived at the pickup destination.</Text>
                        <View style={[styles.centered, { paddingBottom: 35 }]}>
                            <View style={styles.centered}>
                                <AwesomeButtonBlue width={width * 0.65} type={"secondary"} onPress={() => {
                                    this.setState({
                                        isVisible: false
                                    })
                                }}>Close/Exit</AwesomeButtonBlue>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
                <View>
                    <Dialog.Container visible={isVisibleConfirm}>
                    <Dialog.Title>Are you with the client?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you meant to click - "I've arrived"? If so please continue...
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleConfirm: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleConfirm: false
                        }, () => {
                            this.notfiyOfArrival();
                        })
                    }} label="I've Arrived!" />
                    </Dialog.Container>
                </View>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
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