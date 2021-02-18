import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Keyboard } from 'react-native';
import styles from './styles.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import axios from "axios";
import { Config } from 'react-native-config';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";
import { connect } from 'react-redux';
import GetLocation from 'react-native-get-location';
import RBSheet from "react-native-raw-bottom-sheet";
import { Switch } from 'react-native-switch';
import Autocomplete from "react-native-autocomplete-input";
import _ from "lodash";
import { Button, Text as NativeText, Picker, Icon } from 'native-base';

const { height, width } = Dimensions.get("window");


const socket = io(Config.ngrok_url, {transports: ['websocket', 'polling', 'flashsocket']});

class DriversHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        ready: false,
        entries: [],
        towNeeded: true,
        selected: null,
        searchValue: "",
        user: null,
        results: [],
        hideOrNot: false,
        full: null,
        myLocation: null,
        resultsTwo: [],
        serviceRequired: null,
        hideOrNotTwo: false,
        searchValueTwo: "",
        towDesinationFull: null,
        towDesination: null,
        searchDestinationThree: "",
        resultsThree: [],
        queryTwo: "",
        hideOrNotFour: false,
        mechanics: [],
        active: 0
    }
}
    componentDidMount() {
        const tow_driver = this.props.props.route.params.driver;

        axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
            id: tow_driver.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered user's data!") {
                console.log(res.data);

                const { user } = res.data;
                
                this.setState({
                    user,
                    region: {
                        latitude: user.current_location.coords.latitude,
                        longitude: user.current_location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    userLocation: {
                        latitude: user.current_location.coords.latitude,
                        longitude: user.current_location.coords.longitude
                    }
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleRequestAndRedirect = () => {
        const { user, towDesinationFull, myLocation, full, serviceRequired, towNeeded } = this.state;

        if (towNeeded === false) {
            socket.emit("start-roadside-assistance-specific-agent", {
                requestee: this.props.unique_id,
                receiver: user.unique_id,
                user,
                tow_destination_full: towDesinationFull,
                user_current_location: myLocation || full,
                tow_needed: false
            })    
        } else {
            socket.emit("start-roadside-assistance-specific-agent", {
                requestee: this.props.unique_id,
                receiver: user.unique_id,
                user,
                tow_destination_full: towDesinationFull,
                user_current_location: myLocation || full,
                tow_needed: true
            })
    
        }
        // axios.post(`${Config.ngrok_url}/request/tow/as/client/specific/driver`).then((res) => {
        //     if (res.data.message === "") {
        //         console.log(res.data);
        //     } else {
        //         console.log("Err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    renderContentConditional = () => {
        const { user } = this.state;

        if (user !== null) {
            const end = moment(new Date());
            const start = moment(new Date(user.register_system_date));
            let calculatedDate = moment.duration(end.diff(start)).asMonths();

            const string = `Registered ${calculatedDate.toFixed(2)} Months ago`;

            const currentYear = moment().format("YYYY");

            if (calculatedDate < 1) {
                calculatedDate = `Registered ${(moment.duration(end.diff(start)).asDays()).toFixed(0)} days ago`;
            } else {
                calculatedDate = string;
            }

            console.log("calculatedDate", calculatedDate);

            return (
                <Fragment>
                    <View style={styles.main}>
                        <Text style={styles.coName}>Associated Company - {user.company_name}</Text>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <View style={styles.largeColumn}>
                                <Text style={{ fontSize: 22, fontWeight: "bold" }}>Tow driver for hire</Text>
                                <Text style={styles.midSizedText}>Created by {user.fullName}</Text>
                            </View>
                            <View style={styles.smallColumn}>
                                <Image source={{ uri: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : Config.not_available }} style={styles.profilePic} />
                            </View>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <View style={styles.columnTenth}>
                                <Image source={require("../../../assets/icons/engine.png")} style={styles.icon} />
                            </View>
                            <View style={styles.largecolumnTwo}>
                                <Text style={styles.bold}>TOP rated driver</Text>
                                <Text>This is one of our TOP rated roadside agents</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.columnTenth}>
                                <Image source={require("../../../assets/icons/transport.png")} style={styles.icon} />
                            </View>
                            <View style={styles.largecolumnTwo}>
                                <Text style={styles.bold}>Recieve quick service</Text>
                                <Text>Recieve quick and speedy service with the press of a button</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.columnTenth}>
                                <Image source={require("../../../assets/icons/jacked.png")} style={styles.icon} />
                            </View>
                            <View style={styles.largecolumnTwo}>
                                <Text style={styles.bold}>Tow drivers associated company</Text>
                                <Text>This driver is associated with <Text style={styles.bold}>{user.company_name}</Text> tow co.</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.columnTenth}>
                                <Image source={require("../../../assets/icons/odo.png")} style={styles.icon} />
                            </View>
                            <View style={styles.largecolumnTwo}>
                                <Text style={styles.bold}>TOP rated driver</Text>
                                <Text>This is one of our TOP rated roadside agents</Text>
                            </View>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <View style={styles.largecolumnTwo}>
                                <Text style={styles.largeBold}>Hosted by {user.fullName}</Text>
                                <Text style={[styles.greyedOut, { marginTop: 10 }]}>{calculatedDate}</Text>
                            </View>
                        </View>
                        <View style={styles.bioSection}>
                            <View style={[styles.row, { marginTop: 20 }]}>
                                <Image source={require("../../../assets/icons/small-star.png")} style={styles.iconImage} />
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>{user.review_count} Review(s)</Text>
                            </View>
                            <View style={[styles.row, { marginTop: 20 }]}>
                                <Image source={require("../../../assets/icons/shield.png")} style={styles.iconImage} />
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>Identity verified</Text>
                            </View>
                            <View style={[styles.row, { marginTop: 20 }]}>
                                <Image source={require("../../../assets/icons/medal.png")} style={styles.iconImage} />
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>Mechanic2Day supporter</Text>
                            </View>
                        </View>
                        <View style={styles.hr} />
                        <View>
                            <Text style={styles.locationText}>User(s) general location</Text>
                            <MapView
                                region={this.state.region}
                                onRegionChange={this.onRegionChange}
                                style={styles.map}
                                maxZoomLevel={11.5}
                            >
                                <Marker 
                                    title={"User's GENERAL location"}
                                    description={"The users GENERAL location is displayed - exact location is hidden for privacy reasons..."} 
                                    coordinate={this.state.userLocation} 
                                    style={{ maxWidth: 75, maxHeight: 75 }}
                                >   
                                    <Image source={require("../../../assets/icons/circle.png")} style={{ maxWidth: 70, maxHeight: 70 }} />
                                </Marker>
                            </MapView>
                        </View>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue stretch={true} type={"secondary"} onPress={() => {
                            this.RBSheet.open();
                        }}>Request tow from this driver</AwesomeButtonBlue>
                    </View>
                </Fragment>
            );
        } else {
            return null;
        }
    }
    searchForValue =  () => {
        console.log("searchForValue");

        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        const { query } = this.state;

        axios.get(`https://api.tomtom.com/search/2/search/${query}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    gatherLocation = () => {
        console.log("gatherLocation clicked");

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);

            this.setState({
                myLocation: location,
                selected: null,
                full: null
            })
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);

            console.log("code", code, "message", message);
        })
    }
    searchForValueDeliveryAddressTwo = () => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        const { searchDestinationThree } = this.state;

        axios.get(`https://api.tomtom.com/search/2/search/${searchDestinationThree}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                resultsThree: results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    searchForValueDeliveryAddress = () => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        const { searchValueTwo } = this.state;

        axios.get(`https://api.tomtom.com/search/2/search/${searchValueTwo}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                resultsTwo: results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    renderIfTowNeeded = () => {
        const { towNeeded, results, query, selected, myLocation, towDesination, serviceRequired } = this.state;
        if (towNeeded === true) {
            return (
                <View>
                    <Text style={[styles.currentLocationText, { marginBottom: 15 }]}>What is your current location?</Text>
                    {myLocation === null ? <Autocomplete   
                        placeholder={"Enter your current location..."}
                        placeholderTextColor={"grey"}
                        data={results}
                        defaultValue={query}
                        hideResults={this.state.hideOrNot}
                        onChangeText={text => {
                            this.setState({
                                query: text,
                                hideOrNot: false
                            }, () => {
                                this.searchForValue();
                            })
                        }}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity style={styles.listItemTwo} onPress={() => {
                                this.setState({
                                    selected: item.address.freeformAddress,
                                    hideOrNot: true,
                                    full: item
                                }, () => {
                                    Keyboard.dismiss();
                                })
                            }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>{item.address.freeformAddress}</Text>
                            </TouchableOpacity>
                        )}
                    /> : <TouchableOpacity onPress={() => {
                        this.setState({
                            myLocation: null
                        })
                    }}><Text style={styles.iWant}>I want to manually enter my address</Text></TouchableOpacity>}
                    <View style={[styles.centered, { marginTop: 15, marginBottom: 15 }]}>
                        <View style={styles.centered}>
                            <Button info style={styles.customCustom} onPress={() => {
                                this.gatherLocation();
                            }}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Get my location</NativeText>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.margin15}>
                        <Text style={[styles.currentLocationText, { marginBottom: 15 }]}>What is your desination address?</Text>
                        <Autocomplete   
                            placeholder={"Enter your destination location..."}
                            placeholderTextColor={"grey"}
                            data={this.state.resultsTwo}
                            defaultValue={this.state.searchValueTwo}
                            hideResults={this.state.hideOrNotTwo} 
                            onChangeText={text => {
                                this.setState({
                                    searchValueTwo: text,
                                    hideOrNotTwo: false
                                }, () => {
                                    this.searchForValueDeliveryAddress();
                                })
                            }}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity key={i} style={styles.listItemTwo} onPress={() => {
                                    this.setState({
                                        towDesination: item.address.freeformAddress,
                                        hideOrNotTwo: true,
                                        towDesinationFull: item
                                    }, () => {
                                        Keyboard.dismiss();
                                    })
                                }}>
                                    <Text style={{ color: "black", fontWeight: "bold" }}>{item.address.freeformAddress}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={[styles.centered, { marginTop: 20 }]}>
                            <View style={styles.centered}>
                                {((selected !== null || myLocation !== null) && towDesination !== null) || (serviceRequired !== null && selected !== null) ? <Button onPress={() => {
                                    this.RBSheet.close();

                                    this.setState({
                                        active: 1
                                    }, () => {
                                        this.handleRequestAndRedirect();
                                    })
                                }} success style={styles.customCustom}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue & Start Request</NativeText>
                                </Button> : <Button light style={styles.customCustom}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue & Start Request</NativeText>
                                </Button>}
                            </View>
                        </View>
                    </View>
                    
                </View>
            );
        } else {
            return (
                <Fragment>
                    <Text style={[styles.currentLocationText, { marginBottom: 15 }]}>What is your current location?</Text>
                    {myLocation === null ? <Autocomplete
                        placeholder={"Enter your current location..."}
                        placeholderTextColor={"grey"}
                        data={this.state.results}
                        defaultValue={this.state.query}
                        hideResults={this.state.hideOrNot}
                        onChangeText={text => {
                            this.setState({
                                query: text,
                                hideOrNot: false
                            }, () => {
                                this.searchForValue();
                            })
                        }}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity style={styles.listItemTwo} onPress={() => {
                                this.setState({
                                    selected: item.address.freeformAddress,
                                    hideOrNot: true,
                                    full: item
                                }, () => {
                                    Keyboard.dismiss();
                                })
                            }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>{item.address.freeformAddress}</Text>
                            </TouchableOpacity>
                        )}
                    /> : <TouchableOpacity onPress={() => {
                        this.setState({
                            myLocation: null
                        })
                    }}><Text style={styles.iWant}>I want to manually enter my address</Text></TouchableOpacity>}
                    <View style={[styles.centered, { marginTop: 15, marginBottom: 15 }]}>
                        <View style={styles.centered}>
                            <Button info style={styles.customCustom} onPress={() => {
                                this.gatherLocation();
                            }}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Get my location</NativeText>
                            </Button>
                        </View>
                    </View>
                    <View style={[styles.margin, { marginTop: 15 }]}>
                        <Text style={[styles.currentLocationText, { marginBottom: 15 }]}>Which roadside service are you in need of?</Text>
                        <Picker 
                            placeholderTextColor={"grey"}
                            placeholder={"Select the required services you need..."}
                            mode="dropdown"
                            iosHeader="Select the required service..."
                            iosIcon={<Icon name="arrow-down" />}
                            style={styles.minWidthSelect}
                            selectedValue={this.state.serviceRequired}
                            onValueChange={(value) => {
                                this.setState({
                                    serviceRequired: value
                                })
                            }}
                        >
                            <Picker.Item label="Gas Delivery Services" value="gas-delivery" />
                            <Picker.Item label="Jump Start Services" value="jump-start" />
                            <Picker.Item label="Door Unlocking Services" value="door-unlocking" />
                            <Picker.Item label="Tire Change Services" value="tire-change" />
                            <Picker.Item label="'Stuck' Removal Services (stuck vehicle)" value="stuck-vehicle" />
                        </Picker>
                    </View>
                    <View style={[styles.centered, { marginTop: 20 }]}>
                        <View style={styles.centered}>
                            {myLocation !== null && serviceRequired !== null ? <Button onPress={() => {
                                this.RBSheet.close();

                                this.setState({
                                    active: 2
                                }, () => {
                                    this.handleRequestAndRedirect();
                                })
                            }} success style={styles.customCustom}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue & Start Request</NativeText>
                            </Button> : <Button light style={styles.customCustom}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue & Start Request</NativeText>
                            </Button>}
                        </View>
                    </View>
                </Fragment>
            );
        }
    }
    render() {
        console.log("this.props drivers/main/index.js", this.props);
        console.log("this.state, drivers/main/index.js", this.state);

        const { user } = this.state;
        return (
            <Fragment>
                <ParallaxScrollView 
                    backgroundColor="black"
                    contentBackgroundColor="white" 
                    parallaxHeaderHeight={325}  
                    contentContainerStyle={styles.containerStyle}
                    renderBackground={() => {
                        return (
                            <Image source={require("../../../assets/images/tools-1.jpg")} style={styles.background} />
                        );
                    }}
                    renderForeground={() => (
                        <Fragment>
                            
                        </Fragment>
                    )}>
                    <View style={styles.mainContain}>
                        <View style={styles.innerContainer}>
                            <Text style={{ fontWeight: "bold", textAlign: "center" }}>Hire this driver for a roadside assistance claim today! This will immediately dispatch the driver to your location.</Text>
                            <View style={{ marginTop: 15 }} />
                            <AwesomeButtonBlue type={"secondary"} backgroundShadow={"black"} onPress={() => {
                                this.RBSheet.open();
                            }} stretch={true}>Request a tow from this driver</AwesomeButtonBlue>
                        </View>
                        <View style={styles.mainContent}>
                            <View style={styles.absolute}>
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
                                    this.props.props.navigation.goBack();
                                }}>
                                    <Image source={require("../../../assets/icons/go-back.png")} style={styles.goBackIcon} />
                                    <Text style={{ fontSize: 18, marginTop: 5 }}>Go Back</Text>
                                </TouchableOpacity>
                            </View>
                            {this.renderContentConditional()}
                        </View>
                    </View>
                    </ParallaxScrollView>
                    <RBSheet    
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={height}
                        openDuration={250}
                        customStyles={{
                            container: {
                                backgroundColor: "white"
                            }
                        }}
                        >
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }} style={styles.slideUpContainer}>
                                <Text style={styles.slideUpHeader}>Hello there, {this.props.fullName}</Text>
                                <Text style={{ marginTop: 10, fontSize: 19 }}>We're now going to go through some preperation steps in order to get you proper service and quick roadside assistance</Text>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: "row" }}>
                                <Text style={styles.switchText}>Do you need a tow?</Text>
                                <Switch
                                    value={this.state.towNeeded}
                                    onValueChange={(value) => {
                                        this.setState({
                                            towNeeded: value,
                                            towDesination: null, 
                                            serviceRequired: null, 
                                            towDesinationFull: null,
                                            myLocation: null
                                        })
                                    }}
                                    style={styles.switchButton}
                                    disabled={false}
                                    changeValueImmediately={true}
                                    activeText={'Yes'}
                                    inActiveText={'No'}
                                    circleSize={30}
                                />
                                </View>
                                {this.renderIfTowNeeded()}
                            </ScrollView>
                            <View style={styles.positionBottom}>
                                <View style={styles.centered}>
                                    <Button danger style={styles.customCustom} onPress={() => {
                                        this.RBSheet.close();
                                    }}>
                                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Exit/Close</NativeText>
                                    </Button>
                                </View>
                            </View>
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
export default connect(mapStateToProps, { })(DriversHomepageHelper);