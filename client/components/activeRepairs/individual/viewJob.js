import React, { Component, Fragment } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, ListItem, Right, Body, Icon } from 'native-base';
import styles from './styles.js';
import MapView, { Marker } from 'react-native-maps';
import Gallery from 'react-native-image-gallery';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from "react-redux";


class ViewIndividualJobHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        photos: [],
        ready: false,
        user: null,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
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
        }, 500)

        axios.post(`${Config.ngrok_url}/gather/applied/information`, {
            vehicle
        }).then((res) => {
            if (res.data.message === "Successfully located host!") {
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

        Linking.openURL(`tel:${this.state.user.phoneNumber[0].unformatted}`)
    }
    messageHost = () => {
        console.log("messageHost clicked");
    }
    renderMainContent = () => {
        const { user } = this.state;

        const vehicle = this.props.props.route.params.vehicle;
        const itemmm = this.props.props.route.params.item;

        const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

        if (user !== null) {
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
                        <View style={styles.agreedContainer}>
                            <Text style={styles.descHeader}>Description</Text>
                            <Text style={styles.desc}>{vehicle.description}</Text>
                            <Text style={styles.agreed}>Agreed Amount: <Text style={{ color: "#8884FF" }}>${itemmm.agreed_amount}</Text></Text>
                            <Text style={styles.textText}>Agreement made on <Text style={{ fontWeight: "bold" }}>{itemmm.agreement_date}</Text></Text>
                        </View>
                    </View>
                    <View style={{ top: -50 }}>
                        <View style={styles.adjustMargin}>
                            <Text style={styles.hostedText}>Hosted by <Text style={{ textDecorationLine: "underline"}}>{user.fullName}</Text></Text>
                        </View>
                        <View style={styles.adjustMarginCustom}>
                            <View style={styles.columnCustom}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Who's coming</Text>
                                <Text style={{ fontSize: 16 }}>1 Mechanic</Text>
                            </View>
                            <View style={styles.columnCustomSmaller}>
                                <Image source={{ uri: user.profilePics[user.profilePics.length - 1].full_url }} style={styles.iconLarger} />
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
                            initialRegion={this.state.region}
                        >
                            <Marker
                                coordinate={this.state.region}
                                title={vehicle.title}
                                description={vehicle.description} 
                                image={require('../../../assets/icons/car-marker.png')}
                            />
                        </MapView>
                    </View>
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
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ViewIndividualJobHelper);