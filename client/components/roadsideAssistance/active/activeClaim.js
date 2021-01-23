import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle, List, ListItem, Icon, Textarea , Input, Item, Label, Form } from 'native-base';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

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
        polyline: []
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log(res.data);

                const { user } = res.data;

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
    renderConditional = () => {
        const { user, region, towDriverLocation, polyline } = this.state;
        
        if (user !== null && typeof polyline !== 'undefined' && polyline.length > 0) {
            return (
                <Fragment>
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
                </Fragment>
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
    render() {
        console.log("activeClaim.js state", this.state);
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
                <View style={styles.container}>
                    {this.renderConditional()}
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
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={styles.absolutePosition}>
                                    <TouchableOpacity onPress={() => {
                                        this.RBSheetTHREE.close();
                                    }}>
                                        <Image source={require("../../../assets/icons/x.png")} style={styles.headerIcon} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.headerTitle}>
                                    Roadside Assistance Details
                                </Text>
                            </View>

                            <View style={styles.postContent}>
                                <Text style={styles.postTitle}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                </Text>

                                <Text style={styles.postDescription}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                                    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
                                </Text>

                                <Text style={styles.tags}>
                                    Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit. 
                                </Text>

                                <Text style={styles.date}>
                                    2017-11-27 13:03:01
                                </Text>

                                <View style={styles.profile}>
                                    <Image style={styles.avatar}
                                    source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                                    <Text style={styles.name}>
                                        Johan Doe
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.shareButton}>
                                    <Text style={styles.shareButtonText}>Like</Text>  
                                </TouchableOpacity> 
                            </View>
                            </View>
                        </ScrollView>
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
                                <NativeText>Trip Details (arrival ETA, details, driver info & more...)</NativeText>
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