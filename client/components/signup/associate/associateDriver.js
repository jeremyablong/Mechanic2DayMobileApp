import React, { Component, Fragment } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import styles from './styles.js';
import axios from "axios";
import { Config } from 'react-native-config';
import Autocomplete from "react-native-autocomplete-input";
import { List, ListItem, Left, Body, Right, Thumbnail, Text as NativeText } from 'native-base';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { connect } from 'react-redux';
import { sendbirdLogin } from "../../../actions/sendbird/user.js";
import messaging from '@react-native-firebase/messaging';
import { authenticated, finishedSignup } from "../../../actions/signup/auth.js";

const { width, height } = Dimensions.get("window");

class AssociateDriverHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        businesses: [],
        selected: null,
        hideOrNot: true,
        full: null,
        query: ""
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/all/companies/display/tow`).then((res) => {
           if (res.data.message === "Successfully gathered all businesses - towing!") {
                console.log(res.data);

                const { businesses } = res.data;

                this.setState({
                    businesses
                })
           } else {
                console.log(res.data);
           }
        }).catch((err) => {
            console.log(err);
        })
    }
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          this.getFcmToken() //<---- Add this
          console.log('Authorization status:', authStatus);
        } else {
            const { previous } = this.props;

            axios.post(`${Config.ngrok_url}/register/user`, {
                address: previous.address,
                authyID: previous.authyID ? previous.authyID : null,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: previous.accountType,
                active_employee: false
            }).then((response) => {
                if (response.data.message === "Successfully registered new user!") {
                    console.log(response.data);

                    const { full } = this.state;

                    axios.post(`${Config.ngrok_url}/associate/and/notify/tow/company`, { 
                        generatedID: response.data.data.unique_id,
                        company: full
                    }).then((res) => {
                        if (res.data.message === "Associated and notified tow company of your request!") {
                            console.log(res.data);

                            this.props.authenticated(response.data.data);

                            this.props.sendbirdLogin({ userId: response.data.data.unique_id, nickname: response.data.data.fullName });

                            this.props.finishedSignup(true);

                            setTimeout(() => {
                                this.props.props.navigation.navigate("homepage-main");
                            },  500);
                        } else {
                            console.log(res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("err", response.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    getFcmToken = async () => {
        const { previous } = this.props;

        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
            console.log("Your Firebase Token is:", fcmToken);

            axios.post(`${Config.ngrok_url}/register/user`, {
                address: previous.address,
                authyID: previous.authyID ? previous.authyID : null,
                birthdate: previous.birthdate,
                gender: previous.gender,
                fullName: previous.name,
                password: previous.password,
                unformatted: previous.unformatted ? previous.unformatted : null,
                phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
                email: previous.email ? previous.email : "",
                wholeAddress: previous.wholeAddress,
                accountType: previous.accountType,
                firebasePushNotificationToken: fcmToken,
                active_employee: false
            }).then((response) => {
                if (response.data.message === "Successfully registered new user!") {
                    console.log(response.data);

                    const { full } = this.state;

                    axios.post(`${Config.ngrok_url}/associate/and/notify/tow/company`, { 
                        generatedID: response.data.data.unique_id,
                        company: full
                    }).then((res) => {
                        if (res.data.message === "Associated and notified tow company of your request!") {
                            console.log(res.data);

                            this.props.authenticated(response.data.data);

                            this.props.sendbirdLogin({ userId: response.data.data.unique_id, nickname: response.data.data.fullName });

                            this.props.finishedSignup(true);

                            setTimeout(() => {
                                this.props.props.navigation.navigate("homepage-main");
                            },  500);
                        } else {
                            console.log(res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("err", response.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("Failed", "No token received");
        }
    }
    render() {
        const { query, businesses, hideOrNot, full } = this.state;

        console.log("this.state associateDriver", this.state);
        return (
            <Fragment>
                <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                    <View style={styles.backBackground}>
                        {/* <Image source={require("../../../assets/icons/profile.png")} style={styles.accountImage} /> */}
                        <Text style={styles.mainText}>Select the company you work for...</Text>
                        <List>
                        <Autocomplete   
                            containerStyle={styles.inputContainer}
                            data={businesses}
                            placeholderTextColor={"grey"}
                            placeholder={"Search for your company name..."}
                            defaultValue={query} 
                            listStyle={styles.listStyle} 
                            hideResults={hideOrNot}
                            onChangeText={text => {
                                console.log(text);
                                this.setState({ 
                                    query: text,
                                    hideOrNot: false
                                })
                            }}
                            renderItem={({ item, i }) => {
                                console.log("item", item);
                                if (item.company_name.toLowerCase().includes(query.toLowerCase())) {
                                    return (
                                        <ListItem button={true} onPress={() => {
                                            this.setState({
                                                selected: item.company_name,
                                                hideOrNot: true,
                                                full: item
                                            }, () => {
                                                Keyboard.dismiss();
                                            })
                                        }} avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: item.company_image }} />
                                            </Left>
                                            <Body>
                                                <NativeText>{item.company_name}</NativeText>
                                                <NativeText style={{ color: "grey" }}>{item.location.address.freeformAddress}</NativeText>
                                                <NativeText style={{ color: "black" }}>{item.company_phone_number}</NativeText>
                                            </Body>                                            
                                        </ListItem>
                                    );  
                                }                                  
                            }}
                        />
                        </List>
                        {full !== null ? <View style={[styles.centered, { marginTop: 45 }]}>
                            <View style={styles.centered}>
                                <AwesomeButtonRick onPress={this.requestUserPermission} width={width * 0.75} textColor={"black"} type="secondary">Continue & Register</AwesomeButtonRick>
                            </View>
                        </View> : null}
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => {
                                this.props.props.navigation.navigate("mechanic-or-client");
                            }}>
                                <Text style={styles.goBack}>Go Back...</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </ImageBackground>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { sendbirdLogin, authenticated, finishedSignup })(AssociateDriverHelper);