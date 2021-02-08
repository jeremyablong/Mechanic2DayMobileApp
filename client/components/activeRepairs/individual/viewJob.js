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
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import io from 'socket.io-client';


const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});

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
        initiator: null,
        alreadyMarkedComplete: false,
        alreadyMarkedCompleteOther: false
    }
}
    componentDidMount() {

        const vehicle = this.props.props.route.params.vehicle;

        const initiator = this.props.props.route.params.item.initiator;

        const item = this.props.props.route.params.item;

        const other_user_id = this.props.props.route.params.item.other_user;

        this.setState({
            alreadyMarkedComplete: item.other_user_agrees_completion,
            alreadyMarkedCompleteOther: item.poster_agrees_completion
        })

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
    markJobAsCompleteMechanic = () => {
        const vehicle = this.props.props.route.params.vehicle;

        const agreement = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/mark/complete/broken/vehicle/listing/mechanic/user`, {
            id: this.props.unique_id,
            vehicle,
            agreement,
            other_user_id: vehicle.poster,
            vehicle
        }).then((res) => {
            if (res.data.message === "Successfully notifed user of completion and updated data in db!") {
                console.log(res.data);

                this.RBSheetTwo.close();

                socket.emit("completed-repair-mechanic-review", {
                    approved: true,
                    user_id: vehicle.poster,
                    item: agreement
                })

                Toast.show({
                    text1: "BOTH users have successfully marked the job as complete!",
                    text2: "Users have agreed the job is complete and payment was captured.",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("broken-vehicle-review-client", { agreement });
                }, 2500);
            } else if (res.data.message === "STRIPE error occurred...") {
                this.RBSheetTwo.close();

                socket.emit("completed-repair-mechanic-review", {
                    approved: true,
                    user_id: vehicle.poster
                })

                Toast.show({
                    text1: "Payment has already been captured and released.",
                    text2: "This PaymentIntent could not be captured because it has already been captured.",
                    type: "error",
                    visibilityTime: 4500,
                    position: "top"
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("broken-vehicle-review-client", { agreement });
                }, 2500);
            }  else if (res.data.message === "Marked half complete!") {

                this.RBSheetTwo.close();

                socket.emit("notify-other-user-of-completion", {
                    notify: true,
                    user_id: vehicle.poster,
                    fullName: this.props.fullName,
                    item: agreement
                })

                this.setState({
                    alreadyMarkedComplete: true
                })

                Toast.show({
                    text1: "Successfully marked your note of completion!",
                    text2: "Successfully marked completion as complete for your half of the transaction and we have notfied the other user....",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    markJobAsCompleteClient = () => {
        console.log("markJobAsCompleteClient clicked");
        
        const vehicle = this.props.props.route.params.vehicle;

        const agreement = this.props.props.route.params.item;

        axios.post(`${Config.ngrok_url}/mark/complete/broken/vehicle/listing/client/user`, {
            id: this.props.unique_id,
            vehicle,
            agreement,
            other_user_id: this.state.other_user.unique_id,
            vehicle
        }).then((res) => {
            if (res.data.message === "Successfully notifed user of completion and updated data in db!") {
                console.log(res.data);

                this.RBSheet.close();

                socket.emit("successfully-completed-repair", {
                    approved: true,
                    user_id: this.state.other_user.unique_id,
                    item: agreement
                })

                Toast.show({
                    text1: "BOTH users have successfully marked the job as complete!",
                    text2: "Users have agreed the job is complete and payment was captured.",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })
                
                setTimeout(() => {
                    this.props.props.navigation.replace("broken-vehicle-review-mechanic", { agreement });
                }, 2500);
            } else if (res.data.message === "STRIPE error occurred...") {
                this.RBSheet.close();

                socket.emit("successfully-completed-repair", {
                    approved: true,
                    user_id: this.state.other_user.unique_id,
                    item: agreement
                })

                Toast.show({
                    text1: "Payment has already been captured and released.",
                    text2: "This PaymentIntent could not be captured because it has already been captured.",
                    type: "error",
                    visibilityTime: 4500,
                    position: "top"
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("broken-vehicle-review-mechanic", { agreement });
                }, 2500);
            } else if (res.data.message === "Marked half complete!") {
                
                this.RBSheet.close();

                socket.emit("notify-other-user-of-completion", {
                    notify: true,
                    user_id: this.state.other_user.unique_id,
                    fullName: this.props.fullName
                })

                this.setState({
                    alreadyMarkedCompleteOther: true
                })

                Toast.show({
                    text1: "Successfully marked your note of completion!",
                    text2: "Successfully marked completion as complete for your half of the transaction and we have notfied the other user....",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
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
                            }} width={width * 0.85} type="secondary">Manage this active listing</AwesomeButtonRick>
                        </View> : <View style={styles.paymentButton}>
                            <AwesomeButtonRick textColor={"black"} onPress={() => {
                                this.RBSheetTwo.open();
                            }} width={width * 0.85} type="secondary">Manage this active listing</AwesomeButtonRick>
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
                            <Text style={[styles.agreed, { marginTop: 15 }]}>Agreed Amount: <Text style={{ color: "blue" }}>${itemmm.agreed_amount + (itemmm.agreed_amount * 0.20) + (itemmm.agreed_amount * 0.03)}</Text></Text>
                            <Text style={[styles.textText, { marginBottom: -30 }]}>Agreement made on <Text style={{ fontWeight: "bold" }}>{itemmm.agreement_date}</Text></Text>

                            {/* card details go here... */}
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
                                <Text style={{ marginBottom: 15 }}>Once the mechanic has COMPLETED the repair on your vehicle, confirm that the job was done by clicking the button below. This will release the previously captured funds when the job was accepted.</Text></Fragment> : <View style={{ margin: 20 }}>
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
                                
                                <View style={{ marginTop: 15 }}>
                                    {this.state.alreadyMarkedCompleteOther === false ? <AwesomeButtonBlue stretch={true} onPress={() => {
                                        this.markJobAsCompleteClient();
                                    }} type={"primary"}>Mark job as complete</AwesomeButtonBlue> : null}
                                    <View style={styles.hr} />
                                    <AwesomeButtonBlue stretch={true} onPress={() => {}} type={"secondary"}>Request cancellation</AwesomeButtonBlue>
                                </View> 
                                
                            </View>
                        </ScrollView>
                        <View style={styles.bottomButton}>
                            <View style={styles.centered}>
                                <AwesomeButtonRick onPress={() => {
                                    this.RBSheet.close();
                                }} width={width * 0.90} textColor={"black"} type="primary">Close Pane</AwesomeButtonRick>
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
                            
                            <View style={{ margin: 20, marginTop: 40 }}>
                                <Text style={styles.payerText}>You have received ${(itemmm.agreed_amount + (itemmm.agreed_amount * 0.20) + (itemmm.agreed_amount * 0.03)).toFixed(2)}!</Text>
                                <Text style={{ marginTop: 20 }}>ONLY accept the payment upon the completion of the auto repair. Once you accept this payment you're acknowledging that the job is done and complete. This will end the contract between you and {this.state.other_user.fullName}</Text>
                                <View style={[styles.hr, { marginTop: 20, marginBottom: 20 }]} />
                                

                                <View style={{ marginTop: 15 }}>
                                    {this.state.alreadyMarkedComplete === false ? <AwesomeButtonBlue stretch={true} onPress={() => {
                                        this.markJobAsCompleteMechanic();
                                    }} type={"secondary"}>Mark job as complete</AwesomeButtonBlue>: null}
                                    <View style={styles.hr} />
                                    <AwesomeButtonBlue stretch={true} onPress={() => {}} type={"primary"}>Request cancellation</AwesomeButtonBlue>
                                </View> 
                            </View>
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
                                }} width={width * 0.90} textColor={"black"} type="secondary">Close Pane</AwesomeButtonRick>
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
                        <Title style={{ marginTop: 10, left: -15 }}>{title.slice(0, 10)}{typeof title !== "undefined" && title.length > 10 ? "..." : ""} Listing</Title>
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
        return {
            unique_id: state.auth.authenticated.unique_id,
            accountType: state.auth.authenticated.accountType,
            email: state.auth.authenticated.paypal_payment_address,
            fullName: state.auth.authenticated.fullName,
            authenticateddd: state.auth.authenticated
        }   
    } else {
        return {
            
        }
    }
}
export default connect(mapStateToProps, { })(ViewIndividualJobHelper);