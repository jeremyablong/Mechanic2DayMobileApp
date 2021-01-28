import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity, 
    Keyboard,
    Animated
  } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Picker, Icon } from 'native-base';
import styles from './styles.js';
import MapView, { Marker } from 'react-native-maps';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Rating } from 'react-native-ratings';
import GetLocation from 'react-native-get-location';
import { connect } from "react-redux";
import axios from "axios";
import { Config } from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import { Switch } from 'react-native-switch';
import Autocomplete from "react-native-autocomplete-input";
import _ from "lodash";

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
    _renderItem = ({item, index}, parallaxProps) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.props.navigation.push("individual-listing-tow-company", { company: item });
            }} key={index} style={styles.item}>
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
            </TouchableOpacity>
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
                }).then(location => {
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
                }).catch(error => {
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

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
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
    handleRequestAndRedirect = () => {
        const { selected, myLocation, towDesination, serviceRequired, towDesinationFull, active, full } = this.state;

        console.log("handleRequestAndRedirect clicked");

        if (active === 1) {
            axios.post(`${Config.ngrok_url}/start/tow/service/start/finish`, {
                initial_location: full === null ? myLocation : full, 
                id: this.props.unique_id,
                tow_destination: towDesination, 
                tow_information: towDesinationFull
            }).then((res) => {
                if (res.data.message === "Started tow process!") {
                    console.log(res.data);

                    const { tow_services } = res.data;

                    this.props.props.navigation.replace("initialize-tow-two", { tow_services });
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else if (active === 2) {
            axios.post(`${Config.ngrok_url}/start/tow/service/start/finish/two`, {
                initial_location: full === null ? myLocation : full, 
                id: this.props.unique_id,
                roadside_service_required: serviceRequired
            }).then((res) => {
                if (res.data.message === "Started tow process!") {
                    console.log(res.data);

                    const { tow_services } = res.data;

                    this.props.props.navigation.replace("initialize-tow-two", { tow_services });
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
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
                                <TouchableOpacity style={styles.listItemTwo} onPress={() => {
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
                            {(selected !== null || myLocation !== null) && (serviceRequired !== null || selected !== null) ? <Button onPress={() => {
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
    calculateText = () => {
        const { user } = this.state;

        if (user !== null) {
            if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "waiting-room") {
                return "Pickup where you left off";   
            } else if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "mapview-in-progress") {
                return "Continue with active claim";
            } else if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "final-manage-dropoff") {
                return "Finish Roadside Assistance Job";
            } else {
                return "Get immediate assistance";
            }
        }
    }
    render() {
        const { towDesination, selected, myLocation, serviceRequired, user } = this.state;
        console.log("this.state. roadsideLanding.js state", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Roadside Assistance</Title>
                    </Body>
                    <Right>
                        {this.props.accountType === "tow-truck-company" ? <Button onPress={() => {
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
                    {user !== null && _.has(this.props.authenticated, "fullName") && user.accountType !== "tow-truck-driver" ? <View style={styles.marginAbsolute}>
                        <View style={styles.centered}>
                            <AwesomeButtonRick textColor={"black"} onPress={() => {
                                if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "waiting-room") {
                                    this.props.props.navigation.navigate("waiting-room-roadside-assistance");
                                } else if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "mapview-in-progress") {
                                    this.props.props.navigation.navigate("in-progress-roadside-assistance");
                                } else if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "final-manage-dropoff") {
                                    this.props.props.navigation.navigate("driver-has-arrived-manage-listing-depatarture");
                                } else if (_.has(user.towing_services_start, "page") && user.towing_services_start.page === "finale-review") {
                                    this.props.props.navigation.navigate("review-roadside-assistance-agent");
                                } else {
                                    this.RBSheet.open();
                                }
                            }} width={width * 0.75} type="secondary">{this.calculateText()}</AwesomeButtonRick>
                        </View>
                    </View> : null}
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
                                        selected: null,
                                        full: null,
                                        towDesination: null, 
                                        serviceRequired: null, 
                                        towDesinationFull: null
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
        accountType: state.auth.authenticated.accountType,
        fullName: state.auth.authenticated.fullName,
        unique_id: state.auth.authenticated.unique_id,
        authenticated: state.auth.authenticated
    };
}
export default connect(mapStateToProps, { })(RoadsideAssistanceLandingHelper);