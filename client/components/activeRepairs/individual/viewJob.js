import React, { Component, Fragment } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking, Dimensions, Animated } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, ListItem, Right, Body, Icon, List } from 'native-base';
import styles from './styles.js';
import MapView, { Marker } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from "react-redux";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ReadMore from 'react-native-read-more-text';


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
        approveLink: null,
        showDialog: false,
        showOrderDetails: false,
        item: null,
        initiator: null
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
            id: this.props.props.route.params.item.initiator
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
        const other_user_id = this.props.props.route.params.item.other_user;

        axios.post(`${Config.ngrok_url}/gather/applied/information`, {
            other_user_id 
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

        if (_.has(this.state.user.phoneNumber[0], "unformatted")) {
            Linking.openURL(`tel:${this.state.user.phoneNumber[0].unformatted}`);
        } else {
            Toast.show({
                text1: "User has not submitted a phone number yet.",
                text2: "Please message this user for their phone number as they have no previously provided it.",
                type: "error",
                visibilityTime: 4500,
                position: "bottom"
            })
        }
    }
    messageHost = () => {
        console.log("messageHost clicked");
    }
    initiatePayment = () => {
        console.log("initiatePayment clicked");

        const item = this.props.props.route.params.item;
        
        const vehicle = this.props.props.route.params.vehicle;

        const other_user_paypal_email = this.state.other_user.paypal_payment_address;
        
        axios.post(`${Config.ngrok_url}/initiate/payment/paypal/3/step`, {
            amount: item.agreed_amount,
            vehicle,
            paypal_access_token: this.props.paypalToken.access_token,
            email: this.props.email,
            accepted_id: item.accepted_job_id,
            other_user_paypal_email 
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
                            }, () => {
                                if ((links.length - 1) === index) {
                                    setTimeout(() => {
                                        this.approvePaymentAuthorize();
                                    }, 1000);
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
                            }, () => {
                                if ((links.length - 1) === index) {
                                    setTimeout(() => {
                                        this.approvePaymentAuthorize();
                                    }, 1000);
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
                            }, () => {
                                if ((links.length - 1) === index) {
                                    setTimeout(() => {
                                        this.approvePaymentAuthorize();
                                    }, 1000);
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
                            }, () => {
                                if ((links.length - 1) === index) {
                                    setTimeout(() => {
                                        this.approvePaymentAuthorize();
                                    }, 1000);
                                }
                            })
                            break;
                        default:
                            break;
                    }
                }
            } else if (res.data.message === "The other user must complete their paypal before proceeding...") {

                console.log("Res.data error", res.data);

                this.RBSheet.close();

                const { fullName, unique_id, authenticateddd } = this.props;

                axios.post(`${Config.ngrok_url}/notify/push/notification/email/paypal/other`, {
                    id: unique_id,
                    fullName,
                    other_user_id: this.state.other_user.unique_id,
                    profile_pic: authenticateddd.profilePics.length > 0 ? authenticateddd.profilePics[authenticateddd.profilePics.length - 1].full_url : null
                }).then((res) => {
                    console.log(res.data);

                    if (res.data.message === "Notified User!") {
                        console.log("NOTIFIED.");

                        Toast.show({
                            text1: "The OTHER user must list a PayPal payment method before proceeding...",
                            text2: "We need both PayPal email addresses in order to proceed with the fund transfers. We notified the user that they need to update and link a PayPal email to their account.",
                            type: "info",
                            visibilityTime: 4500,
                            position: "bottom"
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    approvePaymentAuthorize = () => {
        const { approveLink, other_user, selfLink } = this.state;

        const item = this.props.props.route.params.item;

        const vehicle = this.props.props.route.params.vehicle;

        this.RBSheet.close();
                                    
        this.props.props.navigation.navigate("paypal-web-view-one", { data: approveLink, other_user, self_link: selfLink, item, vehicle });
    }
    acceptFullPaymentAndClose = () => {
        console.log("acceptFullPaymentAndClose clicked.");

        const vehicle = this.props.props.route.params.vehicle;

        const agreement = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/finalize/payment/paypal/vehicle/repair`, {
            id: this.props.unique_id,
            vehicle,
            agreement,
            paypal_access_token: this.props.paypal_access_token,
            reference_id: null, 
            transaction_id: null,
            other_user_id: vehicle.poster
        }).then((res) => {
            if (res.data.message === "Successfully updated one half of agreement!") {
                console.log(res.data);

                this.RBSheetTwo.close();

                const { item } = res.data;

                this.setState({
                    item
                }, () => {
                    setTimeout(() => {
                        Toast.show({
                            text1: "You've accepted the payment!",
                            text2: "Please wait till the other user accepts the work as 'quality work' and then the funds will be released! If the other user has already accepted the work - the funds will be released now!",
                            visibilityTime: 5000,
                            type: "success"
                        })
                    }, 500);
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "blue", marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    acceptQualityOfWork = () => {
        console.log("acceptQualityOfWork clicked");

        const vehicle = this.props.props.route.params.vehicle;

        axios.post(`${Config.ngrok_url}/accept/job/quality/work/lister`, {
            id: this.props.unique_id,
            vehicle,
            paypal_access_token: this.props.paypal_access_token,
            other_user_id: vehicle.poster
        }).then((res) => {
            if (res.data.message === "Successfully updated one half of agreement!") {
                console.log(res.data);

                const { item } = res.data;

                this.setState({
                    item
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    callMechanic = () => {
        if (_.has(this.state.other_user.phoneNumber[0], "unformatted")) {
            Linking.openURL(`tel:${this.state.other_user.phoneNumber[0].unformatted}`);
        } else {
            Toast.show({
                text1: "User has not submitted a phone number yet.",
                text2: "Please message this user for their phone number as they have no previously provided it.",
                type: "error",
                visibilityTime: 4500,
                position: "bottom"
            })
        }
    }
    renderMainContent = () => {
        const { user, other_user, selfLink, approveLink, updateLink, captureLink, item } = this.state;

        console.log("USER", user);

        const vehicle = this.props.props.route.params.vehicle;
        const itemmm = item !== null ? item : this.props.props.route.params.item;

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
                            {itemmm.initiator === this.props.unique_id ? <TouchableOpacity onPress={() => {
                                this.callMechanic();
                            }} style={styles.column}>
                                <Image source={require('../../../assets/icons/engine.png')} style={styles.iconIcon} />
                                <Text>Call Mechanic</Text>
                            </TouchableOpacity> : <TouchableOpacity onPress={this.callHost} style={styles.column}>
                                <Image source={require('../../../assets/icons/call.png')} style={styles.iconIcon} />
                                <Text>Call Host</Text>
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={this.messageHost} style={styles.rightColumn}>
                                <Image source={require('../../../assets/icons/chat.png')} style={styles.iconIcon} />
                                <Text>Message Host</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.hr, { top: -100, marginBottom: 20 }]} />
                        {itemmm.initiator === this.props.unique_id ? <View style={styles.paymentButton}>
                            <AwesomeButtonRick textColor={"black"} onPress={() => {
                                this.RBSheet.open();
                            }} width={width * 0.85} type="secondary">Manage Payments / Deposit</AwesomeButtonRick>
                        </View> : <View style={styles.paymentButton}>
                            <AwesomeButtonRick textColor={"black"} onPress={() => {
                                this.RBSheetTwo.open();
                            }} width={width * 0.85} type="secondary">Check for deposited funds</AwesomeButtonRick>
                        </View>}
                        <View style={styles.agreedContainer}>
                            <Text style={styles.descHeader}>Description</Text>
                            <ReadMore
                                numberOfLines={4}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text style={styles.desc}>
                                    {vehicle.description}
                                </Text>
                            </ReadMore>
                            <Text style={[styles.agreed, { marginTop: 15 }]}>Agreed Amount: <Text style={{ color: "blue" }}>${itemmm.agreed_amount}</Text></Text>
                            <Text style={[styles.textText, { marginBottom: -30 }]}>Agreement made on <Text style={{ fontWeight: "bold" }}>{itemmm.agreement_date}</Text></Text>
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
                                <Image source={{ uri: other_user.profilePics.length > 0 ? other_user.profilePics[other_user.profilePics.length - 1].full_url : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} style={styles.iconLarger} />
                            </View>
                            <View style={styles.hr} />
                        </View>
                    </View>
                    <View style={styles.list}>
                        <List>
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
                        </List>
                       
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
                        <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                            <View style={{ margin: 20 }}>
                                {!itemmm.paypal_order_id ? <Fragment><Text style={styles.mainPaymentText}>Make Payment</Text>
                                <Text style={{ marginBottom: 15 }}>You will now need to deposit funds into the 3-step payment system. The account user that has listed a vehicle for repair will deposit funds and only when both parties agree that the repair was done and confirmed will the payment be released to the mechanic hired for the job.</Text></Fragment> : <View style={{ margin: 20 }}>
                                    <Text style={styles.mainPaymentText}>You've successfully completed the payment for this repair.</Text>
                                    <View style={[styles.hr, { marginTop: 15, marginBottom: 15 }]} />
                                    <Text>You've successfully completed payment. Both parties will need to confirm once the repair is done and completed in order to release the captured funds.</Text>
                                </View>}
                                <View style={styles.hr} />
                                {/* {approveLink !== null ? <View style={{ marginTop: 15, marginBottom: 15 }}><AwesomeButtonRick onPress={() => {
                                    this.approvePaymentAuthorize();
                                }} width={width * 0.90} type="secondary">Continue and approve payment</AwesomeButtonRick></View> : null} */}
                                {/* {updateLink !== null ? <View style={{ marginTop: 15, marginBottom: 15 }}><AwesomeButtonRick onPress={() => {
                                    // do something
                                }} width={width * 0.90} type="secondary">Update Payment</AwesomeButtonRick></View> : null} */}
                                
                                {!itemmm.paypal_order_id ? <View style={{ marginTop: 15 }}>
                                    <Button info onPress={() => {

                                        if (typeof this.props.email !== 'undefined' && this.props.email !== null) {
                                            this.initiatePayment();
                                        } else {
                                            this.RBSheet.close();

                                            setTimeout(() => {
                                                this.setState({
                                                    showDialog: true
                                                })
                                            }, 750)
                                        }
                                    }} style={styles.initiatePaymentBtn}>
                                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Initiate Payment</NativeText>
                                    </Button>
                                </View> :  null}
                                {itemmm.paypal_order_id && itemmm.processed === true ? <View style={{ marginTop: 15 }}>
                                    <Text style={{ color: "blue", marginBottom: 20 }}>You've already made the required payment to the receipient. You can view your order details by clicking the button below...</Text>
                                    <Button success onPress={() => {
                                        
                                        this.RBSheet.close();

                                        setTimeout(() => {
                                            this.props.props.navigation.push("paypal-view-order-details", { item: itemmm, vehicle });
                                        }, 600)
                                    }} style={styles.initiatePaymentBtn}>
                                        <NativeText style={{ color: "white", fontWeight: "bold" }}>View Order Details</NativeText>
                                    </Button>
                                    <View style={{ marginTop: 15, marginBottom: 15 }} />
                                    
                                    {(itemmm.poster_agrees_completion === false || !itemmm.poster_agrees_completion) ? <View>
                                        <Text style={{ marginBottom: 15 }}>Once you're ready to accept the quality of work the mechanic has provided (at the end of the repair), you can click the button below to confirm the job was done and release the funds...</Text>
                                        <Button onPress={() => {
                                        this.acceptQualityOfWork();
                                    }} style={styles.initiatePaymentBtn}>
                                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Accept Work</NativeText>
                                    </Button></View> : null}
                                </View> : null}
                            </View>
                        </ScrollView>
                        <View style={styles.bottomButton}>
                            <View style={styles.centered}>
                                <AwesomeButtonRick onPress={() => {
                                    this.RBSheet.close();
                                }} width={width * 0.90} textColor={"white"} type="primary">Close Pane</AwesomeButtonRick>
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
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center"
                            }
                        }}
                    >
                        <ScrollView style={styles.container}>
                            
                            {itemmm.paypal_order_id ? <View style={{ margin: 20 }}>
                                <Text style={styles.payerText}>You have received ${itemmm.agreed_amount.toFixed(2)}!</Text>
                                <Text style={{ marginTop: 20 }}>ONLY accept the payment upon the completion of the auto repair. Once you accept this payment you're acknowledging that the job is done and complete. This will end the contract between you and {this.state.other_user.fullName}</Text>
                                <View style={[styles.hr, { marginTop: 20, marginBottom: 20 }]} />
                                
                                <View style={styles.centered}>
                                    <View style={styles.centered}>
                                        <Button light onPress={() => {

                                            this.RBSheetTwo.close();

                                            setTimeout(() => {
                                                this.props.props.navigation.push("paypal-view-order-details", { item: itemmm });
                                            }, 600)
                                        }} style={styles.acceptPaymentBtnTwo}>
                                            <NativeText style={{ fontWeight: "bold", color: "white" }}>View Order/Payment Details</NativeText>
                                        </Button>
                                    </View>
                                </View>
                            </View> : <View style={{ margin: 20 }}>
                                <Text style={[styles.biggerText, { marginTop: 20 }]}>The other user has not initiated payment yet. Once the user initiates payment you will be able to reject or accept the payment and see more details at that point.</Text>
                            </View>}
                            {itemmm.paypal_order_id && (itemmm.other_user_agrees_completion === false || !itemmm.other_user_agrees_completion) ? <View style={styles.centered}>
                                <View style={styles.centered}>
                                    <Button info onPress={() => {
                                        this.acceptFullPaymentAndClose();
                                    }} style={styles.acceptPaymentBtn}>
                                        <NativeText style={{ fontWeight: "bold", color: "white" }}>ACCEPT PAYMENT</NativeText>
                                    </Button>
                                </View>
                            </View> : null}
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
        } else {
            return (
            <View style={{ margin: 20 }}>
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                </SkeletonPlaceholder>
            </View>
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
                            this.props.props.navigation.push("active-jobs");
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>{title.slice(0, 30)}{typeof title !== "undefined" && title.length > 30 ? "..." : ""} Listing</Title>
                    </Left>
                </Header>
                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>You must complete your PayPal email before proceeding...</Dialog.Title>
                    <Dialog.Description>
                        We use PayPal primarily for our payment system. You must have a PayPal email on file before proceeding, would you like to redirect to payments?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        }, () => {
                            this.props.props.navigation.navigate("payments-cards");
                        })
                    }} label="REDIRECT" />
                    </Dialog.Container>
                </View>
                
                <ScrollView contentContainerStyle={{ paddingBottom: 300 }} style={styles.container}>
                
                    <View style={styles.galleryContainer}>
                        {this.renderGallery()}
                    </View>
                    
                    {this.renderMainContent()}
                    
                </ScrollView>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state state", state);
    if (Object.keys(state.auth.authenticated).length > 0) {
        if (Object.keys(state.auth.authenticated.paypal_authorization).length > 0) {
            return {
                unique_id: state.auth.authenticated.unique_id,
                accountType: state.auth.authenticated.accountType,
                paypalToken: state.auth.authenticated.paypal_authorization,
                email: state.auth.authenticated.paypal_payment_address,
                fullName: state.auth.authenticated.fullName,
                authenticateddd: state.auth.authenticated,
                paypal_access_token: state.auth.authenticated.paypal_authorization.access_token
            }   
        } else {
            return {
                unique_id: state.auth.authenticated.unique_id,
                accountType: state.auth.authenticated.accountType,
                paypalToken: state.auth.authenticated.paypal_authorization,
                email: state.auth.authenticated.paypal_payment_address,
                fullName: state.auth.authenticated.fullName,
                authenticateddd: state.auth.authenticated,
                paypal_access_token: null
            }
        }
    } else {
        return {
            
        }
    }
}
export default connect(mapStateToProps, { })(ViewIndividualJobHelper);