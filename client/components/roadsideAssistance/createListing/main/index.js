import React, { Component, Fragment } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import axios from 'axios';
import { Config } from 'react-native-config';
import Dialog from "react-native-dialog";
import _ from "lodash";
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

class CreateListingMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        showDialog: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { user } = this.state;

        console.log("this.state. main.index.js", this.state);
        return (
            <Fragment>
                 <ParallaxScrollView    
                    fadeOutForeground={true}
                    backgroundColor="black"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={300}
                    renderForeground={() => (
                        <ImageBackground source={require("../../../../assets/images/mech-6.jpg")} style={{ height: 300, alignItems: 'center', justifyContent: 'center' }}>
                         
                            <TouchableOpacity style={styles.absolutelyTop} onPress={() => {
                                this.props.props.navigation.push("profile-main");
                            }}>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={{ maxWidth: 50, maxHeight: 50, tintColor: "white" }} />
                                <Text style={styles.whiteText}>Go Back</Text>
                            </TouchableOpacity>
                            <View style={styles.transparentBackground}>
                                <Text style={styles.largerText}>List your company</Text>
                                <Text style={styles.largeText}>Start scaling your roadside assistance co. today!</Text>
                            </View>
                        </ImageBackground>
                    )}>
                    <Fragment>
                        <View style={{ height: "100%", paddingBottom: 150 }}>
                            <View style={styles.margin}>
                                <Text style={styles.headerText}>Earn and average of $667/Month EXTRA</Text>
                                <Text style={[styles.normalText, { marginTop: 10 }]}>Join hundreds of thousands of tow companies earing money on MechanicToday, the world's larget auto repair marketplace.</Text>
                            </View>
                            <View style={styles.margin}>
                                <View style={[styles.centered, { marginBottom: 30 }]}>
                                    <AwesomeButtonRick textColor={"black"} onPress={() => {
                                        this.props.props.navigation.push("roadside-assistance-display-listings");
                                    }} width={width * 0.75} type="secondary">Manage roadside assistance listings</AwesomeButtonRick>      
                                </View>
                                <View style={styles.box}>
                                    <View style={styles.columnOne}>
                                        <Image source={require("../../../../assets/icons/jacked.png")} style={styles.mechanicIcon} />
                                    </View>
                                    <View style={styles.columnTwo}>
                                        <Text style={styles.boxHeader}>How it works</Text>
                                        <Text>Listing is free, you can set your own prices, avaliablity, and rules. Meetup's are simple, you get paid quickly after each trip. We're here to help along the way.</Text>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Text style={{ color: "blue", fontWeight: "bold", textAlign: "right" }}>Learn More</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                <View style={styles.box}>
                                    <View style={styles.columnOne}>
                                        <Image source={require("../../../../assets/icons/jacked.png")} style={styles.mechanicIcon} />
                                    </View>
                                    <View style={styles.columnTwo}>
                                        <Text style={styles.boxHeader}>You're Covered</Text>
                                        <Text>Each protection plan includes $750,000 in liability insurance from Liberty Mutual and damage protection from Turo, just in case there is a mishap.</Text>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Text style={{ color: "blue", fontWeight: "bold", textAlign: "right" }}>Learn More</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                <View style={styles.box}>
                                    <View style={styles.columnOne}>
                                        <Image source={require("../../../../assets/icons/jacked.png")} style={styles.mechanicIcon} />
                                    </View>
                                    <View style={styles.columnTwo}>
                                        <Text style={styles.boxHeader}>We've got your back</Text>
                                        <Text>We include 12,000 mile or ONE year warranties on ALL repairs. This means if your mechanic does anything wrong, we'll fix it no questions asked.</Text>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Text style={{ color: "blue", fontWeight: "bold", textAlign: "right" }}>Learn More</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Fragment>
                </ParallaxScrollView>
                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>You MUST verify/validate your account before proceeding as payments are involved in later steps.</Dialog.Title>
                    <Dialog.Description>
                        Would you like to stay on this page or redirect to the verification section?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="STAY" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        }, () => {
                            this.props.props.navigation.push("verify-validate-account-stripe");
                        })
                    }} label="REDIRECT" />
                    </Dialog.Container>
                </View>
                <View style={styles.centeredAbsolute}>
                    <View style={styles.centered}>
                        <AwesomeButtonCartman onPress={() => {
                            if (_.has(user, "completed_stripe_onboarding") && user.completed_stripe_onboarding === true) {
                                this.props.props.navigation.navigate("advertise-create-address-preview");
                            } else {
                                this.setState({
                                    showDialog: true
                                })
                            }
                        }} width={width} type="anchor" textColor={"white"}>List your company</AwesomeButtonCartman>
                    </View>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(CreateListingMainHelper);