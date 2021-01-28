import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, Dimensions, Linking } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle, List, ListItem, Icon, Textarea , Input, Item, Label, Form } from 'native-base';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Dialog from "react-native-dialog";
import _ from "lodash";
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";


const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});


const { height, width } = Dimensions.get("window");


class ActiveProposalRoadsideAssistanceInProgressHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        region: {},
        towTruckDriverInfo: null,
        interval: null,
        towDriverLocation: null,
        privateMessage: "",
        privateTitle: "",
        polyline: [],
        isVisibleConfirmation: false,
        roadside_assistance_company: null
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log(res.data);

                const { user } = res.data;

                axios.post(`${Config.ngrok_url}/gather/breif/data/two/custom`, {
                    id: user.towing_services_start.tow_driver_infomation.unique_id,
                    company_name: user.towing_services_start.assigned_company
                }).then((res) => {
                    if (res.data.message === "Gathered user's data!") {
                        console.log(res.data);

                        this.setState({
                            roadside_assistance_company: res.data.company
                        })
                    } else {
                        console.log("ERR: ", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })

                const tow_driver_unique_id = user.towing_services_start.tow_driver_infomation.unique_id;

                const intervalTimer = setInterval(() => {
                    axios.post(`${Config.ngrok_url}/gather/user/location/in/transit`,{
                        id: tow_driver_unique_id
                    }).then((responseeee) => {
                        if (responseeee.data.message === "Gathered location!") {

                            console.log("responseeee.data", responseeee.data);

                            const { location } = responseeee.data;

                            const configuration = {
                                headers: {
                                    "content-type": "application/json"
                                }
                            }

                            axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${location.coords.latitude},${location.coords.longitude}/json?key=${Config.tomtom_api_key}`, configuration).then((resolution) => {
                                console.log("Inner API Request: ", resolution.data);
                                
                                const { routes } = resolution.data;

                                this.setState({
                                    polyline: routes[0].legs[0].points
                                })
                            }).catch((err) => {
                                console.log(err);
                            })

                            this.setState({
                                towDriverLocation: {
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }
                            });
                        } else {
                            console.log("err", responseeee.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                },  4000);

                this.setState({
                    user,
                    region: {
                        latitude: user.current_location.coords.latitude,
                        longitude: user.current_location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    },
                    towTruckDriverInfo: user.towing_services_start.tow_driver_infomation,
                    interval: intervalTimer
                }, () => {
                    axios.post(`${Config.ngrok_url}/gather/user/location/in/transit`,{
                        id: tow_driver_unique_id
                    }).then((responseeee) => {
                        if (responseeee.data.message === "Gathered location!") {

                            const { location } = responseeee.data;

                            console.log("1", location.coords.latitude, "2", location.coords.longitude, "3", user.current_location.coords.latitude,"4", user.current_location.coords.longitude, Config.tomtom_api_key);

                            const configuration = {
                                headers: {
                                    "content-type": "application/json"
                                }
                            }

                            axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${user.current_location.coords.latitude},${user.current_location.coords.longitude}:${location.coords.latitude},${location.coords.longitude}/json?key=${Config.tomtom_api_key}`, configuration).then((resolution) => {
                                console.log("Inner API Request: ", resolution.data);
                                
                                const { routes } = resolution.data;

                                this.setState({
                                    polyline: routes[0].legs[0].points
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            console.log("err", responseeee.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                })
            } else {
                console.log("errrrroorrr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    confirmDriverHasArrived = () => {
        console.log("confirmDriverHasArrived clicked.");

        const { towTruckDriverInfo } = this.state;

        axios.post(`${Config.ngrok_url}/second/step/confirm/drivers/arrival`, {
            id: this.props.unique_id,
            other_user_id: towTruckDriverInfo.unique_id
        }).then((res) => {
            if (res.data.message === "Both users have confirmed the arrival!") {
                console.log(res.data);

                socket.emit("approved-driver-arrival", {
                    approved: true,
                    user_id: towTruckDriverInfo.unique_id
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("driver-has-arrived-manage-listing-depatarture");
                }, 1500);

            } else if (res.data.message === "User has NOT yet marked that they've arrived...") {
                console.log("ERR: ", res.data);

                Toast.show({
                    text1: "The driver has not confirmed your arrival yet...",
                    text2: "The driver hasn't confirmed your arrival. Once they do you will be able to proceed!",
                    visibilityTime: 5500,
                    position: "top",
                    type: "info"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditional = () => {
        const { user, region, towDriverLocation, polyline } = this.state;
        
        if (user !== null && typeof polyline !== 'undefined' && polyline.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        initialRegion={region}
                    >
                        <Marker.Animated 
                            ref={marker => this.marker = marker}
                            coordinate={towDriverLocation}
                        >
                            <Image source={require("../../../assets/icons/tow-truck.png")} style={{ maxWidth: 50, maxHeight: 50 }} />
                        </Marker.Animated>
                        <Polyline
                            coordinates={this.state.polyline}
                            strokeColor="black" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#7F0000',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000'
                            ]}
                            strokeWidth={7}
                        />
                    </MapView>
                    <View style={styles.absolutelyTopLeft}>
                        <TouchableOpacity onPress={() => {
                            this.RBSheet.open();
                        }}>
                            <View style={styles.columnThird}>
                                <View style={styles.centered}>
                                    <Image source={require("../../../assets/icons/info.png")} style={styles.headerIconTwo} />
                                    <Text>More Options</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.atTheBottom}>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                <AwesomeButtonBlue backgroundShadow={"lightblue"} width={width * 0.75} type={"primary"} textColor={"white"} onPress={() => {
                                    this.setState({
                                        isVisibleConfirmation: true
                                    })
                                }}>Confirm driver has arrived</AwesomeButtonBlue>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
    componentWillUnmount(){
        const { interval } = this.state;

        clearInterval(interval)
    }
    sendPrivateMessage = () => {
        console.log("sendPrivateMessage");
    }
    contactTowCompany = () => {
        console.log("contactTowCompany clicked");

        Linking.openURL(`tel:${this.state.roadside_assistance_company.company_phone_number}`)
    }
    render() {
        console.log("activeClaim.js state", this.state);

        const { roadside_assistance_company } = this.state;
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
                        <Title>Active Tow</Title>
                        <Subtitle>Active request, driver on the way...</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("homepage-main");
                        }} transparent>
                            <Text style={{ fontSize: 18 }}>Home</Text>
                        </Button>
                    </Right>
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View style={styles.container}>
                    {this.renderConditional()}
                </View>
                <View>
                    <Dialog.Container visible={this.state.isVisibleConfirmation}>
                    <Dialog.Title>Confirm the driver has arrived</Dialog.Title>
                    <Dialog.Description>
                       Are you sure you meant to click this button? Only continue if the driver is "on-site".
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleConfirmation: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleConfirmation: false
                        }, () => {
                            this.confirmDriverHasArrived();
                        })
                    }} label="Driver is here!" />
                    </Dialog.Container>
                </View>
                <RBSheet    
                    animated={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheetTWO = ref;
                    }}
                    height={575}
                    openDuration={250}
                    customStyles={{
                        container: {

                        }
                    }}
                >
                    <Fragment>
                        <View style={styles.absolutePosition}>
                            <TouchableOpacity onPress={() => {
                                this.RBSheetTWO.close();
                            }}>
                                <Image source={require("../../../assets/icons/x.png")} style={styles.headerIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.marginCentered}>
                            <View style={styles.centered}>
                            <Form>
                                <Text style={styles.labelTwo}>Enter a title/subject for your private message</Text>
                                <Item style={styles.itemItem} floatingLabel>
                                    <Label>Message Title</Label>
                                    <Input value={this.state.privateTitle} onChangeText={(value) => {
                                        this.setState({
                                            privateTitle: value
                                        })
                                    }} placeholderTextColor={"grey"} placeholder={'Enter your private message here...'}/>
                                </Item>
                                <Text style={styles.label}>Enter your private message</Text>
                                <Textarea numberOfLines={8} value={this.state.privateMessage} style={styles.textInput} onChangeText={(value) => {
                                    this.setState({
                                        privateMessage: value
                                    })
                                }} placeholderTextColor={"grey"} placeholder={'Enter your private message here...'} />
                            </Form>
                            <AwesomeButtonBlue onPress={() => {
                                this.sendPrivateMessage();
                            }} width={width * 0.90} style={{ marginTop: 30 }} type="secondary">Submit & Send Message</AwesomeButtonBlue>
                            </View>
                        </View>
                    </Fragment>
                </RBSheet>
                <RBSheet    
                    animated={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheetTHREE = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {

                        }
                    }}
                >
                    <Fragment>
                        {roadside_assistance_company !== null ? <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={styles.absolutePosition}>
                                    <TouchableOpacity onPress={() => {
                                        this.RBSheetTHREE.close();
                                    }}>
                                        <Image source={require("../../../assets/icons/x.png")} style={[styles.headerIcon, { tintColor: "white" }]} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.headerTitle}>
                                    Roadside Assistance Details
                                </Text>
                            </View>

                            <View style={styles.postContent}>
                                <Text style={[styles.postTitle, { marginBottom: 15 }]}>
                                    Driver is employed by {roadside_assistance_company.company_name}.
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tow Company Service Rates</Text>
                                <Text style={styles.postDescription}>
                                    Tire Change: ${roadside_assistance_company.services.change_tire_cost} {"\n"}
                                    Gas Delivery: ${roadside_assistance_company.services.gas_delivery_cost} {"\n"}
                                    Jumpstart Services: ${roadside_assistance_company.services.jumpstart_cost} {"\n"}
                                    Stuck Vehicle Removal: ${roadside_assistance_company.services.remove_stuck_vehicle} {"\n"}
                                    Unlock Door(s) Service: ${roadside_assistance_company.services.unlock_locked_door_cost}
                                </Text>
                                <View style={styles.hr}/>
                                <Text style={styles.postDescription}>
                                    Flat Rate Assistance Fee: ${roadside_assistance_company.standard_tow_fees.tow_price} {roadside_assistance_company.standard_tow_fees.currency} {"\n"}
                                    Cost Per Mile: ${roadside_assistance_company.standard_tow_fees.per_mile_fee} {roadside_assistance_company.standard_tow_fees.currency} {"\n"}
                                </Text>
                                <Text style={styles.postTitle}>
                                    Company Name: <Text style={{ color: "darkblue" }}>{roadside_assistance_company.company_name}</Text>
                                </Text>
                                
                                <Text style={styles.date}>
                                    Company Page Posted On {roadside_assistance_company.date}
                                </Text>

                                <View style={styles.profile}>
                                    <Image style={styles.avatar}
                                    source={{ uri: roadside_assistance_company.company_image }}/>

                                    <AwesomeButtonBlue style={{ marginLeft: 10 }} type={"secondary"} width={width * 0.60} onPress={this.contactTowCompany}>Contact Tow Co.</AwesomeButtonBlue>
                                </View>
                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                    
                                </View>
                                <Text style={[styles.postTitle, { marginTop: 30 }]}>Operational Hours</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Sunday open: {"\n"}{roadside_assistance_company.operational_hours.sunday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Sunday close: {"\n"}{roadside_assistance_company.operational_hours.sunday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Monday open: {"\n"}{roadside_assistance_company.operational_hours.monday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Monday close: {"\n"}{roadside_assistance_company.operational_hours.monday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Tuesday open: {"\n"}{roadside_assistance_company.operational_hours.tuesday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Tuesday close: {"\n"}{roadside_assistance_company.operational_hours.tuesday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Wednesday open: {"\n"}{roadside_assistance_company.operational_hours.wednesday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Wednesday close: {"\n"}{roadside_assistance_company.operational_hours.wendesday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Thursday open: {"\n"}{roadside_assistance_company.operational_hours.thursday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Thursday close: {"\n"}{roadside_assistance_company.operational_hours.thursday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Friday open: {"\n"}{roadside_assistance_company.operational_hours.friday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Friday close: {"\n"}{roadside_assistance_company.operational_hours.friday_closing}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Saturday open: {"\n"}{roadside_assistance_company.operational_hours.saturday_opening}</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Saturday close: {"\n"}{roadside_assistance_company.operational_hours.saturday_closing}</Text>
                                    </View>
                                </View>
                            </View>
                            </View>
                        </ScrollView> : null}
                    </Fragment>
                </RBSheet>
                <RBSheet    
                    animated={new Animated.Value(0)}
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={200}
                    openDuration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                    >
                        <List>
                            <ListItem button={true} onPress={() => {
                                
                                this.RBSheet.close();

                                setTimeout(() => {
                                    this.RBSheetTHREE.open();
                                }, 750);
                            }} icon style={styles.listitem}>
                            <Left>
                                <Button onPress={() => {

                                    this.RBSheet.close();

                                    setTimeout(() => {
                                        this.RBSheetTHREE.open();
                                    }, 750);
                                }} transparent>
                                    <Image source={require("../../../assets/icons/facetime.png")} style={styles.maximum} />
                                </Button>
                            </Left>
                            <Body>
                                <NativeText>View Tow Co. Information</NativeText>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {
                                
                            }} icon style={styles.listitem}>
                            <Left>
                                <Button transparent>
                                    <Image source={require("../../../assets/icons/call-2.png")} style={styles.maximum} />
                                </Button>
                            </Left>
                            <Body>
                                <NativeText>Audio Call Driver</NativeText>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {
                                this.RBSheet.close();
                                
                                setTimeout(() => {
                                    this.RBSheetTWO.open();
                                }, 750);
                            }} icon style={styles.listitem}>
                            <Left>
                                <Button transparent>
                                    <Image source={require("../../../assets/icons/send-message.png")} style={styles.maximum} />
                                </Button>
                            </Left>
                            <Body>
                                <NativeText>Private Message Driver</NativeText>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                        </List>
                    </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ActiveProposalRoadsideAssistanceInProgressHelper);