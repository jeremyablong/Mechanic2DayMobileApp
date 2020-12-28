import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Button, Right, Title, Form, Item, Label, Input, Textarea, Text as NativeText, List, ListItem } from 'native-base';
import styles from './styles.js';
import { Config } from "react-native-config";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GetLocation from 'react-native-get-location';
import { connect } from "react-redux";

class LocationDetailsListVehicleHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        location: null,
        nextPage: false,
        title: "",
        description: "",
        listing: null
    }
}
    componentDidMount() {
        const listing = this.props.props.route.params.listing;

        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/gather/listing/specific/vehicle/listing`, {
                listing_id: this.props.props.route.params.listing.id,
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Successfully gathered listing!") {
                    console.log(res.data);
    
                    const { listing } = res.data;
    
                    this.setState({
                        listing
                    })
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },  400);
    }
    gatherCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);

            this.setState({
                location,
                nextPage: true
            })
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }
    continueAndSubmit = () => {
        console.log("continueAndSubmit");

        const { title, description, listing, location } = this.state;

        const listing_backup = this.props.props.route.params.listing;

        axios.post(`${Config.ngrok_url}/add/new/data/vehicle/listing/two`, {
            id: this.props.unique_id,
            title,
            description,
            listing: listing || listing_backup,
            location
        }).then((res) => {
            if (res.data.message === "Successfully added new data to your post!") {
                console.log(res.data);

                const { listing } = res.data;
                
                this.props.props.navigation.replace("create-vehicle-listing-three", { listing });
            } else {
                console.log("ERr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContent = () => {
        const { nextPage } = this.state;

        if (nextPage === false) {
            return (
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
                    <View style={{ margin: 20 }}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Country/Region</Label>
                                <Input value={this.state.country} placeholder={"United States"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        country: value
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Street</Label>
                                <Input value={this.state.street} placeholder={"e.g. 123 Main St."} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        street: value
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Apt, suite, etc... (optional)</Label>
                                <Input value={this.state.extension} placeholder={"e.g. Apt #7"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        extension: value
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>City</Label>
                                <Input value={this.state.city} placeholder={"e.g. San Francisco"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        city: value
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>State</Label>
                                <Input value={this.state.state} placeholder={"e.g. CA / California"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        state: value
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Zip/Postal Code</Label>
                                <Input value={this.state.zipCode} placeholder={"e.g. San Francisco"} placeholderTextColor={"grey"} onChangeText={(value) => {
                                    this.setState({
                                        zipCode: value
                                    })
                                }} />
                            </Item>

                        </Form>
                    </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <KeyboardAwareScrollView>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Description & Title</Text>
                            <Text style={{ marginTop: 10 }}>Enter a breif detailed description and title for your posting...</Text>
                        </View>
                        
                            <View style={{ margin: 20 }}>
                                <Text style={[styles.fontMedium, { marginBottom: 10 }]}>Title (25 Charector limit)</Text>
                                <Item floatingLabel>
                                    <Label>Title</Label>
                                    <Input onChangeText={(value) => {
                                        this.setState({
                                            title: value
                                        })
                                    }} />
                                </Item>
                                
                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.fontMedium}>Description (300 Charector limit)</Text>
                                    <Textarea onChangeText={(value) => {
                                        this.setState({
                                            description: value
                                        })
                                    }} rowSpan={5} bordered placeholderTextColor={"grey"} placeholder="Enter a detailed description here..." />
                                </View>
                            </View>
                            <View style={[styles.centered, { margin: 20 }]}>
                                <View style={styles.centered}>
                                    {this.renderButton()}
                                </View>
                            </View>
                            
                    </KeyboardAwareScrollView>
                </ScrollView>
            );
        }
    }
    renderButton = () => {
        const { title, description } = this.state;

        if ((typeof title !== 'undefined' && title.length > 0) && (typeof description !== 'undefined' && description.length > 0)) {
            return (
                <Fragment>
                    <Button bordered info onPress={() => {
                        this.continueAndSubmit();
                    }} style={styles.locationButton}>
                        <NativeText style={{ color: "black" }}>Continue</NativeText>
                    </Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Button bordered danger onPress={() => {
                        
                    }} style={styles.locationButton}>
                        <NativeText style={{ color: "black" }}>Continue</NativeText>
                    </Button>
                </Fragment>
            );
        }
    }
    render() {
        console.log("this.state. location index.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("providers-listing-homepage");
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Let's set up your listing</Title>
                    </Left>
                    
                </Header>
                {this.renderContent()}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(LocationDetailsListVehicleHelper);