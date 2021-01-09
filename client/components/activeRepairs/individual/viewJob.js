import React, { Component, Fragment } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking, Dimensions, Animated } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, ListItem, Right, Body, Icon } from 'native-base';
import styles from './styles.js';
import MapView, { Marker } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from "react-redux";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import RBSheet from "react-native-raw-bottom-sheet";


const { height, width } = Dimensions.get("window");

class ViewIndividualJobHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        photos: [],
        ready: false,
        user: null,
        other_user: null,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        captureLink: null,
        updateLink: null,
        selfLink: null,
        approveLink: null
    }
}
    componentDidMount() {

        const vehicle = this.props.props.route.params.vehicle;

        const { location } = vehicle;

        if (vehicle.location_manual_entry === true) {
            const headers = {
                params: {
                    key: Config.mapquest_api_key,
                    street: location.street, 
                    city: location.city, 
                    state: location.state,
                    postalCode: location.zipCode
                }
            };

            axios.get("http://www.mapquestapi.com/geocoding/v1/address", headers).then((res) => {
                console.log(res.data);

                if (res.data.results) {

                    const { locations } = res.data.results[0];
                    
                    for (let index = 0; index < locations.length; index++) {
                        const loc = locations[index];
                        
                        if (loc.postalCode.includes("-")) {
                            if (loc.postalCode.split("-")[0] === location.zipCode) {

                                console.log("includes");

                                const { lat, lng } = loc.displayLatLng;
    
                                this.setState({
                                    region: {
                                        longitude: lng,
                                        latitude: lat,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }
                                })
                            }
                        } else {
                            if (loc.postalCode === location.zipCode) {

                                console.log("does not include.")

                                const { lat, lng } = loc.latLng;
    
                                this.setState({
                                    region: { 
                                        longitude: lng,
                                        latitude: lat,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }
                                })
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.setState({
                region: {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            })
        }

        setTimeout(() => {
            for (let index = 0; index < vehicle.photos.length; index++) {
                const photo = vehicle.photos[index];
                
                this.setState({
                    photos: [...this.state.photos, { source: { uri: photo } }]
                }, () => {
                    if ((vehicle.photos.length - 1) === index) {
                        this.setState({
                            ready: true
                        })
                    }
                });
            }
        }, 500);

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

        axios.post(`${Config.ngrok_url}/gather/applied/information`, {
            vehicle
        }).then((res) => {
            if (res.data.message === "Successfully located host!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    other_user: user
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderGallery = () => {
        const { ready, photos } = this.state;
        if (ready === true) {
            return (
                <Gallery
                    style={styles.gallery}
                    images={photos}
                />
            );
        }
    }
    gatherDirections = () => {
        console.log("gatherDirections clicked");

        const vehicle = this.props.props.route.params.vehicle;

        const { location } = vehicle;

        if (vehicle.location_manual_entry === true) {

            console.log("manual entry");

            const headers = {
                params: {
                    key: Config.mapquest_api_key,
                    street: location.street, 
                    city: location.city, 
                    state: location.state,
                    postalCode: location.zipCode
                }
            };

            axios.get("http://www.mapquestapi.com/geocoding/v1/address", headers).then((res) => {
                console.log(res.data);

                if (res.data.results) {

                    const { locations } = res.data.results[0];
                    
                    for (let index = 0; index < locations.length; index++) {
                        const loc = locations[index];

                        if (loc.postalCode.includes("-")) {
                            if (loc.postalCode.split("-")[0] === location.zipCode) {

                                console.log("locatttttion", loc);

                                const { lat, lng } = loc.displayLatLng;

                                const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${lat},${lng}`;

                                Linking.canOpenURL(url).then(supported => {
                                    if (!supported) {
                                        console.log('Can\'t handle url: ' + url);
                                    } else {
                                        return Linking.openURL(url);
                                    }
                                }).catch(err => console.error('An error occurred', err)); 
                            }
                        } else {
                            if (loc.postalCode === location.zipCode) {

                                console.log("locatttttion", loc);

                                const { lat, lng } = loc.displayLatLng;

                                const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${lat},${lng}`;

                                Linking.canOpenURL(url).then(supported => {
                                    if (!supported) {
                                        console.log('Can\'t handle url: ' + url);
                                    } else {
                                        return Linking.openURL(url);
                                    }
                                }).catch(err => console.error('An error occurred', err)); 
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("non manual entry - used location services button");

            const latLng = `${location.latitude},${location.longitude}`;

            const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${latLng}`;

            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err)); 
        }
    }
    callHost = () => {
        console.log("callHost clicked");

        Linking.openURL(`tel:${this.state.other_user.phoneNumber[0].unformatted}`)
    }
    messageHost = () => {
        console.log("messageHost clicked");
    }
    initiatePayment = () => {
        console.log("initiatePayment clicked");

        const item = this.props.props.route.params.item;
        
        const vehicle = this.props.props.route.params.vehicle;
        
        axios.post(`${Config.ngrok_url}/initiate/payment/paypal/3/step`, {
            amount: item.agreed_amount,
            vehicle,
            paypal_access_token: this.props.paypalToken.access_token
        }).then((res) => {
            if (res.data.message === "Successfully executed paypal logic!") {
                console.log(res.data);

                const { links, data } = res.data;

                for (let index = 0; index < links.length; index++) {
                    const link = links[index];
                    switch (link.rel) {
                        case "self":
                            this.setState({
                                selfLink: {
                                    link: link.rel,
                                    href: link.href,
                                    other: {
                                        id: data.id,
                                        status: data.status
                                    }
                                }
                            })
                            break;
                        case "approve": 
                            this.setState({
                                approveLink: {
                                    link: link.rel,
                                    href: link.href,
                                    other: {
                                        id: data.id,
                                        status: data.status
                                    }
                                }
                            })
                            break;
                        case "update": 
                            this.setState({
                                updateLink: {
                                    link: link.rel,
                                    href: link.href,
                                    other: {
                                        id: data.id,
                                        status: data.status
                                    }
                                }
                            })
                            break;
                        case "capture":
                            this.setState({
                                captureLink: {
                                    link: link.rel,
                                    href: link.href,
                                    other: {
                                        id: data.id,
                                        status: data.status
                                    }
                                }
                            })
                            break;
                        default:
                            break;
                    }
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderMainContent = () => {
        const { user, other_user, selfLink, approveLink, updateLink, captureLink } = this.state;

        console.log("USER", user);

        const vehicle = this.props.props.route.params.vehicle;
        const itemmm = this.props.props.route.params.item;

        const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

        if (other_user !== null && user !== null) {
            return (
                <Fragment>
                    <View>
                        <View style={styles.marginSpacer}>
                            <Text style={[styles.header, { color: "blue" }]}>{title}</Text>
                            <Text style={styles.header}>{vehicle.title}</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={{ flexDirection: "row", top: -50 }}>
                            <TouchableOpacity onPress={this.gatherDirections} style={styles.column}>
                                <Image source={require('../../../assets/icons/world.png')} style={styles.iconIcon} />
                                <Text>Directions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.callHost} style={styles.column}>
                                <Image source={require('../../../assets/icons/call.png')} style={styles.iconIcon} />
                                <Text>Call Host</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.messageHost} style={styles.rightColumn}>
                                <Image source={require('../../../assets/icons/chat.png')} style={styles.iconIcon} />
                                <Text>Message Host</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.hr, { top: -100, marginBottom: 20 }]} />
                        {user.accountType === "client" ? <View style={styles.paymentButton}>
                            <AwesomeButtonRick onPress={() => {
                                this.RBSheet.open();
                            }} width={width * 0.85} type="primary">Make Payment / Deposit Funds</AwesomeButtonRick>
                        </View> : <View style={styles.paymentButton}>
                            <AwesomeButtonRick onPress={() => {
                                this.RBSheetTwo.open();
                            }} width={width * 0.85} type="secondary">Check for deposited funds</AwesomeButtonRick>
                        </View>}
                        <View style={styles.agreedContainer}>
                            <Text style={styles.descHeader}>Description</Text>
                            <Text style={styles.desc}>{vehicle.description}</Text>
                            <Text style={styles.agreed}>Agreed Amount: <Text style={{ color: "#8884FF" }}>${itemmm.agreed_amount}</Text></Text>
                            <Text style={styles.textText}>Agreement made on <Text style={{ fontWeight: "bold" }}>{itemmm.agreement_date}</Text></Text>
                        </View>
                    </View>
                    <View style={{ top: -50 }}>
                        <View style={styles.adjustMargin}>
                            <Text style={styles.hostedText}>Hosted by <Text style={{ textDecorationLine: "underline"}}>{other_user.fullName}</Text></Text>
                        </View>
                        <View style={styles.adjustMarginCustom}>
                            <View style={styles.columnCustom}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Who's coming</Text>
                                <Text style={{ fontSize: 16 }}>1 Mechanic</Text>
                            </View>
                            <View style={styles.columnCustomSmaller}>
                                <Image source={{ uri: other_user.profilePics[other_user.profilePics.length - 1].full_url }} style={styles.iconLarger} />
                            </View>
                            <View style={styles.hr} />
                        </View>
                    </View>
                    <View style={styles.list}>
                        <ListItem button={true} onPress={() => {}} style={styles.listitem} icon>
                            <Left>
                            <Button transparent>
                               <Image source={require('../../../assets/icons/cancel.png')} style={styles.iconIcon} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Cancel Reservation</Text>
                            </Body>
                            <Right>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}} style={styles.listitem} icon>
                            <Left>
                            <Button transparent>
                               <Image source={require('../../../assets/icons/make.png')} style={styles.iconIcon} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Change Reservation</Text>
                            </Body>
                            <Right>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}} style={styles.listitem} icon>
                            <Left>
                            <Button transparent>
                               <Image source={require('../../../assets/icons/version.png')} style={styles.iconIcon} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Get Receipt</Text>
                            </Body>
                            <Right>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                       
                    </View>
                    <Text style={[styles.descHeader, { marginBottom: 40, marginLeft: 20, color: "black" }]}>Getting there</Text>
                    <View>
                        <MapView    
                            style={styles.map}
                            region={this.state.region}
                        >
                            <Marker
                                coordinate={this.state.region}
                                title={vehicle.title}
                                description={vehicle.description} 
                                image={require('../../../assets/icons/car-marker.png')}
                            />
                        </MapView>
                    </View>
                    <RBSheet
                        animated={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={height}
                        openDuration={250}
                        customStyles={{
                            container: {
                                
                            }
                        }}
                    >
                        <ScrollView style={styles.container}>
                            <View style={{ margin: 20 }}>
                                <Text style={styles.mainPaymentText}>Make Payment</Text>
                                <Text style={{ marginBottom: 15 }}>You will now need to deposit funds into the 3-step payment system. The account user that has listed a vehicle for repair will deposit funds and only when both parties agree that the repair was done and confirmed will the payment be released to the mechanic hired for the job.</Text>
                                <View style={styles.hr} />
                                {approveLink !== null ? <View style={{ marginTop: 15, marginBottom: 15 }}><AwesomeButtonRick onPress={() => {
                                    this.RBSheet.close();
                                    
                                    this.props.props.navigation.navigate("paypal-web-view-one", { data: approveLink, other_user });
                                }} width={width * 0.90} type="secondary">Continue and approve payment</AwesomeButtonRick></View> : null}
                                {updateLink !== null ? <View style={{ marginTop: 15, marginBottom: 15 }}><AwesomeButtonRick onPress={() => {
                                    // do something
                                }} width={width * 0.90} type="secondary">Update Payment</AwesomeButtonRick></View> : null}
                                
                                <View style={{ marginTop: 15 }}>
                                    <Button info onPress={() => {
                                        this.initiatePayment();
                                    }} style={styles.initiatePaymentBtn}>
                                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Initiate Payment</NativeText>
                                    </Button>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.bottomButton}>
                            <View style={styles.centered}>
                                <AwesomeButtonRick onPress={() => {
                                    this.RBSheet.close();
                                }} width={width * 0.90} type="primary">Close Pane</AwesomeButtonRick>
                            </View>
                        </View>
                    </RBSheet>
                    <RBSheet    
                        animated={new Animated.Value(0)}
                        ref={ref => {
                            this.RBSheetTwo = ref;
                        }}
                        height={height}
                        openDuration={250}
                        customStyles={{
                            container: {
                                
                            }
                        }}
                    >
                        <ScrollView style={styles.container}>
                            
                        </ScrollView>
                        <View style={styles.bottomButton}>
                            <View style={styles.centered}>
                                <AwesomeButtonRick onPress={() => {
                                    this.RBSheetTwo.close();
                                }} width={width * 0.90} type="secondary">Close Pane</AwesomeButtonRick>
                            </View>
                        </View>
                    </RBSheet>
                </Fragment>
            );
        }
    }
    render() {
        const vehicle = this.props.props.route.params.vehicle;
        console.log("vehicle", vehicle);
        console.log("props" , this.props);
        console.log("this.STATE", this.state);
        const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>{title.slice(0, 30)} Listing</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 300 }} style={styles.container}>
                    <View style={styles.galleryContainer}>
                        {this.renderGallery()}
                    </View>
                    {this.renderMainContent()}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        accountType: state.auth.authenticated.accountType,
        paypalToken: state.auth.authenticated.paypal_authorization
    }
}
export default connect(mapStateToProps, { })(ViewIndividualJobHelper);