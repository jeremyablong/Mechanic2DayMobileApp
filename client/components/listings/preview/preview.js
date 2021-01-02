import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Textarea, Form, Input, Item, Label } from 'native-base';
import { Config } from "react-native-config";
import axios from "axios";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Gallery from 'react-native-image-gallery';
import ReadMore from 'react-native-read-more-text';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import moment from "moment";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountryPicker from 'react-native-country-picker-modal';
import GetLocation from 'react-native-get-location';





const { width, height } = Dimensions.get("window");

const dataaa = [{
    title: "Engine Jobs",
    description: "Anything related to the main engine functionality",
    background: require("../../../assets/images/car-11.jpg"),
    index: 1
}, { 
    title: "Exhaust Jobs",
    description: "Anything related to the exahust of the vehicle/bike",
    background: require("../../../assets/images/car-10.jpg"),
    index: 2
}, { 
    title: "Maintenance",
    description: "This category is strictly for general maintenance jobs",
    background: require("../../../assets/images/car-9.jpg"),
    index: 3
}, {
    title: "Tire/Brakes",
    description: "This is strictly for JUST tire and break jobs of all varieties",
    background: require("../../../assets/images/car-8.jpg"),
    index: 4
}, { 
    title: "Interior Design",
    description: "Design and re-design of the interior of a vehicle",
    background: require("../../../assets/images/car-7.jpg"),
    index: 5
}, {
    title: "Oil Changes",
    description: "Oil changes, we all need em!",
    background: require("../../../assets/images/car-6.jpg"),
    index: 6
}, { 
    title: "Electrical Work",
    description: "Fuses, lights, signals, and the main electrical components of any vehicle",
    background: require("../../../assets/images/car-5.jpg"),
    index: 7
}, {
    title: "Speciality Repairs",
    description: "Bmw, Infiniti, Etc... foreign vehicle repairs",
    background: require("../../../assets/images/car-4.jpg"),
    index: 8
}, { 
    title: "Speciality Upgrades",
    description: "This category is strictly for high-end vehicle upgrades...",
    background: require("../../../assets/images/car-1.jpg"),
    index: 9
}, {
    title: "Transmission Repairs",
    description: "Transmission repairs - anything tranny related!",
    background: require("../../../assets/images/car-2.jpg"),
    index: 10
}, { 
    title: "Diagnostics",
    description: "Find out what's wrong with your vehicle",
    background: require("../../../assets/images/car-3.jpg"),
    index: 11
}];

class PreviewListingViewHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listing: null, 
        loading: false,
        gallery: [], 
        latLng: null, 
        location: null, 
        user: null,
        listingTitle: "",
        listingDescription: "",
        listingLocation: null,
        country: null, 
        street: "", 
        extension: "", 
        state: "", 
        zipCode: "", 
        city: ""
    };
}
    calculateCategory = (listing) => {
        switch (listing.type_of_repair) {
            case "engine":
                return "Engine Repair";
                break;
            case "transmission":
                return "Transmission Repair";
                break;
            case "exhaust":
                return "Exhaust Repair";
                break;
            case "maintenance":
                return "General Maintenance";
                break;
            case "tire-breaks-wheels":
                return "Tire/Breaks & Wheel Related Repair";
                break;
            case "interior-repair-design":
                return "Interior Repair/Design";
                break;
            case "electronics/electrical":
                return "Electrical Repair";
                break;
            case "tuning-sports-upgrades":
                return "Tuning/Sports Upgrades";
                break;
            case "speciality-repairs":
                return "Speciality Repairs (BMW, Audi, Etc..)";
                break;
            case "deisel":
                return "Deisel Repairs";
                break;
            case "body-work":
                return "Body Work";
                break;
            case "motorcycle/motorbike":
                return "Motorcycle/Motorbike Repairs";
                break;      
            default:
                break; 
        }
    }
    gatherCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);

            this.setState({
                listingLocation: location,
                country: "",
                street: "", 
                extension: "", 
                state: "", 
                zipCode: "", 
                city: ""
            }, () => {
                const headers = {
                    params: {
                        key: Config.mapquest_api_key,
                        location: `${location.latitude},${location.longitude}`
                    }
                };

                axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                    console.log("TRANSLATED:", res.data);

                    if (res.data) {
                        this.setState({
                            location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                        }, () => {
                            
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            })
        })
        .catch(error => {
            const { code, message } = error;

            console.warn(code, message);
        })
    }
    handleCountrySelection = (country) => {
        console.log("handleCountrySelection country --- :", country);

        this.setState({
            country: country.name,
            listingLocation: null
        })
    }
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/specific/listing/vehicle/posting`, {
            listing: this.props.props.route.params.listing
        }).then((res) => {
            if (res.data.message === "Successfully gathered listing!") {
                console.log("MAGIC ONE: ", res.data);

                const { listing } = res.data;
                
                const new_picture_array = [];

                const promiseee = new Promise((resolve, reject) => {
                    if (listing.photos) {
                        for (let index = 0; index < listing.photos.length; index++) {
                            const photo = listing.photos[index];
                            
                            new_picture_array.push({
                                source: {
                                    uri: photo
                                }
                            })

                            if ((listing.photos.length - 1) === index) {
                                resolve(new_picture_array);
                            }
                        }
                    } else {
                        resolve([{ source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } }]);
                    }
                })
                promiseee.then((passedData) => {
                    if (_.has(listing.location, "country")) {
                        const headers = {
                            params: {
                                key: Config.mapquest_api_key,
                                street: listing.location.street, 
                                city: listing.location.city, 
                                state: listing.location.state,
                                postalCode: listing.location.zipCode
                            }
                        };

                        axios.get("http://www.mapquestapi.com/geocoding/v1/address", headers).then((res) => {
                            console.log(res.data);

                            if (res.data.results) {
                                this.setState({
                                    latLng: {
                                        latitude: res.data.results[0].locations[0].latLng.lat,
                                        longitude: res.data.results[0].locations[0].latLng.lng,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    },
                                    location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        console.log("do nothing.");

                        this.setState({
                            latLng: {
                                latitude: listing.location.latitude,
                                longitude: listing.location.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }
                        }, () => {
                            const headers = {
                                params: {
                                    key: Config.mapquest_api_key,
                                    location: `${listing.location.latitude},${listing.location.longitude}`
                                }
                            };
        
                            axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                                console.log(res.data);

                                if (res.data) {
                                    this.setState({
                                        location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                                    })
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        })
                    }
                    
                    this.setState({
                        gallery: passedData,
                        listing,
                        listingTitle: listing.title,
                        listingDescription: listing.description
                    })
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })


        axios.post(`${Config.ngrok_url}/gather/listing/by/poster/id`, {
            poster_id: this.props.props.route.params.listing.poster
        }).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log("We got a response :", res.data);

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
    renderConditional = () => {
        const { listing, gallery, latLng, location, user } = this.state;
        if (listing !== null) {
            return (
                <Fragment>
                    <View style={{ maxHeight: 250, flex: 1 }}>
                        <Gallery
                            style={{ maxHeight: 250, minHeight: 250, top: 0, position: 'absolute', backgroundColor: 'black' }}
                            images={gallery}
                        />
                    </View>
                    <ScrollView style={{ top: 175 }}>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Textarea style={styles.title} value={this.state.listingTitle} rowSpan={3} onChangeText={(value) => {
                                this.setState({
                                    listingTitle: value
                                })
                            }} bordered placeholder={"Enter your title..."} />
                            <View style={styles.row}>
                                <Image source={require("../../../assets/icons/small-star.png")} style={{ maxWidth: 15, maxHeight: 15 }} />
                                <Text>4.3 ({Math.floor(Math.random() * 40) + 1})</Text>
                                <Image source={require("../../../assets/icons/medal.png")} style={styles.medal} />
                                <Text>SuperMechanic</Text>
                            </View>
                            <View style={[styles.row, { marginTop: 5 }]}>
                                <Text style={styles.location}>{location !== null ? location : "---------"}</Text>
                            </View>
                            <View style={styles.hr} />
                        </View>
                        <View style={[styles.centered, { marginTop: 10, marginBottom: 10 }]}>
                            <View style={styles.centered}>
                                <Button danger style={[styles.minButton, { marginTop: 15 }]} onPress={() => {
                                    this.setState({
                                        listing,
                                        isVisible: true
                                    })
                                }}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Delete</NativeText>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.containerTwo}>
                            <Text style={styles.category}>{this.calculateCategory(listing)}</Text>
                            <Text style={{ fontSize: 16 }}>hosted by {user !== null ? user.fullName : "Unknown"}</Text>
                        </View>
                        {/* <View style={styles.rowMargin}>
                            <Text style={{ fontSize: 20 }}>2016 Nissan Sentra Sedan 4-door 145,000 miles</Text>
                        </View> */}
                        <View style={styles.hrTwo} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.mildBoldText}>Vehicle Location</Text>
                            <View style={styles.rowCustomTwo}>
                                <View style={{ marginTop: 20 }}>
                                    <Image source={require("../../../assets/icons/world.png")} style={{ maxWidth: 60, maxHeight: 60 }} />
                                </View>
                                <View style={{ margin: 10, marginTop: 20 }}>
                                    <Text> {location !== null ? location : "---------"} {"\n"}<Text> Free "Come to you" service or drop it off</Text></Text>
                                    <TouchableOpacity onPress={() => {
                                        this.RBSheet.open();
                                    }}><Text style={styles.customTextThree}>CHANGE LOCATION</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.hrTwo} />
                        <View style={styles.rowMargin}>
                            <View style={styles.column}>
                                <Image source={require("../../../assets/icons/make.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontWeight: "bold" }}>Make</Text>
                                <Text style={styles.centeredText}>{listing.make}</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../assets/icons/door.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontWeight: "bold" }}>Model</Text>
                                <Text style={styles.centeredText}>{listing.model}</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../assets/icons/year.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontWeight: "bold" }}>Year</Text>
                                <Text style={styles.centeredText}>{listing.year}</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../assets/icons/odo.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontWeight: "bold" }}>Odometer</Text>
                                <Text style={styles.centeredText}>{listing.odemeter}</Text>
                            </View>
                            
                        </View>
                        <View style={styles.hrThree} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Textarea value={this.state.listingDescription} rowSpan={7} onChangeText={(value) => {
                                this.setState({
                                    listingDescription: value
                                })
                            }} bordered placeholder={"Listing description goes here..."} />
                        </View>
                        <View style={styles.hrFour} />
                        <View style={[styles.marginMargin, { flexDirection: "row" }]}>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../assets/icons/car-1.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../assets/icons/car-2.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                            
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../assets/icons/car-3.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                            
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.centeredTextCustom}>View All Symptoms</Text>
                            </View>
                        </View>
                        <View style={styles.hrFour} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.descriptionTitle}>Location</Text>
                            <Text style={{ fontSize: 18 }}>{location !== null ? location : "-------------------"}</Text>
                            {latLng !== null ? <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={latLng}
                            >
                                <Marker 
                                    image={require('../../../assets/icons/circle.png')}
                                    coordinate={latLng}
                                    title={"Approximate (NOT exact) location"}
                                    description={"We will reveal the true location upon booking..."}
                                />
                            </MapView> : null}
                        </View>
                        <View style={styles.marginMargin}>
                            <View style={styles.row}>
                                <Image source={require("../../../assets/icons/small-star.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontSize: 18, marginTop: 6 }}>4.3 ({Math.floor(Math.random() * 40) + 1} Reviews)</Text>
                            </View>
                            <View style={styles.noMargin}>
                                {typeof reviews !== 'undefined' && reviews.length > 0 ? reviews.slice(0, 2).map((review, index) => {
                                    return (
                                        <Fragment>
                                            <Content style={styles.contentContent} padder>
                                                <Card>
                                                    <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{ uri: review.profilePic }} />
                                                        <Body>
                                                        <Text>{review.name}</Text>
                                                        <Text note>{review.memberSince}</Text>
                                                        </Body>
                                                    </Left>
                                                    </CardItem>
                                                    <CardItem style={{ margin: 20 }} cardBody>
                                                        <ReadMore
                                                            numberOfLines={3}
                                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                                            renderRevealedFooter={this._renderRevealedFooter}
                                                            onReady={this._handleTextReady}>
                                                                <Text style={{ fontSize: 18 }}>
                                                                    {review.review}
                                                                </Text>
                                                        </ReadMore>
                                                    </CardItem>
                                                </Card>
                                            </Content>
                                            
                                        </Fragment>
                                    );
                                }) : null}
                            </View>
                            <View style={styles.rowMargin}>
                                <View style={styles.columnColumnLeft}>
                                    <Text style={styles.mildBoldText}>Posted by {user !== null ? user.fullName : "Unknown"}</Text>
                                    <Text style={{ marginTop: 10 }}>Joined in {user !== null ? moment(user.register_system_date).format("MMMM YYYY") : "-----"}</Text>
                                </View>
                                <View style={styles.columnColumn}>
                                    <Image source={require("../../../assets/images/me.jpg")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                </View>
                                
                            </View>
                            <View style={[styles.rowRow, { marginTop: 0 }]}>
                                <Image source={require("../../../assets/icons/small-star.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>{Math.floor(Math.random() * 70) + 1} Reviews</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 10 }]}>
                                <Image source={require("../../../assets/icons/shield.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>Identity Confirmed</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 10 }]}>
                                <Image source={require("../../../assets/icons/medal.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>SuperGuest</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>During your stay</Text>
                                <Text>If you need anything you can contact me at 213-248-8623</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>{user !== null ? user.fullName : "Unknown"} is a SuperGuest</Text>
                                <Text>SuperGuest's are experienced, highly rated customers who are committed to providing fluent and consistent experiences for all vehicle repairs.</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18 }}>Response Rate - 100%</Text>
                                <Text style={{ fontSize: 18, marginTop: 10 }}>Response Time - Within one hour</Text>
                            </View>
                            {this.props.authenticated === true ? <View style={styles.marginCentered}>
                                <Button style={{ width: "100%", justifyContent: "center" }} bordered onPress={() => {
                                    this.RBSheet.open();
                                }}>
                                    <NativeText>Contact Mechanic</NativeText>
                                </Button>
                                
                            </View> : null}
                            <View style={styles.margin}>
                                <Text style={{ marginTop: 10, textAlign: "left" }}>To protect your payment, never transfer money or communicate outside the (Company Name) website or app.</Text>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Carousel 
                                    layout={'stack'} 
                                    layoutCardOffset={`70`}
                                    ref={(c) => { 
                                        this._carousel = c; 
                                    }}
                                    data={dataaa}
                                    renderItem={this._renderItem}
                                    sliderWidth={width}
                                    itemWidth={width * 0.90}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else {
            return (
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width, height: 250 }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
            
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
        
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                    
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                    
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                    
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            );
        }
    }
    handleDeletion = () => {
        const { listing } = this.state;

        console.log("handleDeletion");

        axios.post(`${Config.ngrok_url}/delete/listing/broken/vehicle`, {
            listing,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully deleted listing!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user,
                    isVisible: false
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Read more
            </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    saveUpdateLocationGeoButton = () => {
        const { listing, listingLocation } = this.state;

        axios.post(`${Config.ngrok_url}/update/location/listing/edit`, {
            listing,
            id: this.props.unique_id,
            updated_location: listingLocation
        }).then((res) => {
            if (res.data.message === "Successfully updated listing location!") {
                console.log(res.data);

                const { broken_listing } = res.data;

                this.setState({
                    latLng: {
                        latitude: broken_listing.location.latitude,
                        longitude: broken_listing.location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    },
                    listing: broken_listing
                }, () => {
                    const headers = {
                        params: {
                            key: Config.mapquest_api_key,
                            location: `${broken_listing.location.latitude},${broken_listing.location.longitude}`
                        }
                    };

                    axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                        console.log(res.data);

                        if (res.data) {
                            this.setState({
                                location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                            }, () => {
                                this.RBSheet.close();
                            })
                        } else {
                            this.RBSheet.close();
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                })
                
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleFullAddressLocationChange = () => {
        const { listing, country, street, extension, state, zipCode, city } = this.state;

        axios.post(`${Config.ngrok_url}/update/location/listing/edit/manual/entry`, {
            listing,
            id: this.props.unique_id,
            country, 
            street,
            extension, 
            state, 
            zipCode, 
            city
        }).then((res) => {
            if (res.data.message === "Successfully updated listing location!") {
                console.log(res.data);

                const { broken_listing } = res.data;

                if (_.has(broken_listing.location, "country")) {
                    const headers = {
                        params: {
                            key: Config.mapquest_api_key,
                            street: broken_listing.location.street, 
                            city: broken_listing.location.city, 
                            state: broken_listing.location.state,
                            postalCode: broken_listing.location.zipCode
                        }
                    };

                    axios.get("http://www.mapquestapi.com/geocoding/v1/address", headers).then((res) => {
                        console.log(res.data);

                        if (res.data.results) {
                            this.setState({
                                latLng: {
                                    latitude: res.data.results[0].locations[0].latLng.lat,
                                    longitude: res.data.results[0].locations[0].latLng.lng,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                },
                                location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                            }, () => {
                                this.RBSheet.close();
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderWhenReady = () => {
        const { country, street, extension, state, zipCode, city } = this.state;

        if (this.state.listingLocation !== null) {
            return (
                <Fragment>
                    <View style={[styles.centered, { margin: 20 }]}>
                        <View style={styles.centered}>
                            <Button style={[styles.customBtnnn, {  }]} onPress={() => {
                                this.saveUpdateLocationGeoButton();
                            }}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Submit/Save & Update</NativeText>
                            </Button>
                        </View>
                    </View>
                </Fragment>
            );
        } else {
            if (country !== null && (typeof street !== "undefined" && street.length > 0) && (typeof state !== "undefined" && state.length > 0) && (typeof zipCode !== "undefined" && zipCode.length > 0) && (typeof city !== "undefined" && city.length > 0)) {
                return (
                    <Fragment>
                        <View style={[styles.centered, { margin: 20 }]}>
                            <View style={styles.centered}>
                                <Button style={[styles.customBtnnn, {  }]} onPress={() => {
                                    this.handleFullAddressLocationChange();
                                }}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Submit Manual Entry</NativeText>
                                </Button>
                            </View>
                        </View>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <View style={[styles.centered, { margin: 20 }]}>
                            <View style={styles.centered}>
                                <Button style={[styles.customBtnnn, { backgroundColor: "lightgrey" }]}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Submit Manual Entry</NativeText>
                                </Button>
                            </View>
                        </View>
                    </Fragment>
                );
            }   
        }
    }
    render() {
        const listing = this.props.props.route.params.listing;

        console.log("listing", listing);

        const { country } = this.state;
        return (
            <Fragment>
                    <Header>
                        <Left>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Icon name='arrow-back' />
                                <NativeText>Back</NativeText>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Preview Listing</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <NativeText>Save</NativeText>
                            </Button>
                        </Right>
                    </Header>
                    <ScrollView contentContainerStyle={{ paddingBottom: 300 }} style={styles.containerScoll}>
                        {this.renderConditional()}
                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={height}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            }}
                        >
                            <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                                <View style={{ margin: 20 }}>
                                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>What's the location of your vehicle?</Text>
                                    <Text style={{ marginTop: 10 }}>Only confirmed mechanics will get your exact address after they book your listing. We'll show everyone else an approximate position.</Text>
                                </View>
                                <KeyboardAwareScrollView>
                                <View style={[styles.centered, { margin: 20 }]}>
                                    <View style={styles.centered}>
                                        <Button bordered onPress={() => {
                                            this.gatherCurrentLocation();
                                        }} style={styles.locationButton}>
                                            <NativeText style={{ color: "black" }}>Use Current Location</NativeText>
                                        </Button>
                                    </View>
                                    <Text style={{ marginTop: 30 }}>Or enter your address</Text>
                                </View>
                                {this.renderWhenReady()}
                                <View style={{ margin: 20 }}>
                                    <Form>
                        
                                
                                        <View style={{ marginLeft: 15 }}>
                                            <CountryPicker preferredCountries={["US"]} withAlphaFilter={false} withCurrency={true} withCallingCode={true} onSelect={this.handleCountrySelection} />
                                            {country !== null ? <View style={{ marginTop: 10 }}><Text style={{ fontSize: 18 }}>{country}</Text></View> : null}
                                        </View>
                                        
                                        <Item floatingLabel>
                                            <Label>Street</Label>
                                            <Input value={this.state.street} placeholder={"e.g. 123 Main St."} placeholderTextColor={"grey"} onChangeText={(value) => {
                                                this.setState({
                                                    street: value,
                                                    listingLocation: null
                                                })
                                            }} />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Apt, suite, etc... (optional)</Label>
                                            <Input value={this.state.extension} placeholder={"e.g. Apt #7"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                                this.setState({
                                                    extension: value,
                                                    listingLocation: null
                                                })
                                            }} />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>City</Label>
                                            <Input value={this.state.city} placeholder={"e.g. San Francisco"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                                this.setState({
                                                    city: value,
                                                    listingLocation: null
                                                })
                                            }} />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>State</Label>
                                            <Input value={this.state.state} placeholder={"e.g. CA / California"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                                this.setState({
                                                    state: value,
                                                    listingLocation: null
                                                })
                                            }} />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Zip/Postal Code</Label>
                                            <Input value={this.state.zipCode} placeholder={"e.g. San Francisco"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                                this.setState({
                                                    zipCode: value,
                                                    listingLocation: null
                                                })
                                            }} />
                                        </Item>

                                    </Form>
                                </View>
                                </KeyboardAwareScrollView>
                            </ScrollView>
                            <View style={styles.bottomSlideUpContainer}>
                                <Button onPress={() => {
                                    this.RBSheet.close();
                                }} style={styles.innerPaneButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Close/Exit</NativeText>
                                </Button>
                            </View>
                        </RBSheet>
                        <View>
                            <Dialog.Container visible={this.state.isVisible}>
                            <Dialog.Title>Delete Listing</Dialog.Title>
                            <Dialog.Description>
                                Do you want to delete this listing? You cannot undo this action.
                            </Dialog.Description>
                            <Dialog.Button onPress={() => {
                                this.setState({
                                    isVisible: false
                                })
                            }} label="Cancel" />
                            <Dialog.Button onPress={this.handleDeletion} label="Delete" />
                            </Dialog.Container>
                        </View>
                    </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
};
export default connect(mapStateToProps, {})(PreviewListingViewHelper);