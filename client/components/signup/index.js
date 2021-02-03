import React, { Component, Fragment } from 'react'
import { View, Text, Image, Dimensions } from "react-native";
import styles from "./styles.js";
import { Container, Header, Button, Tab, Tabs, Item, Input, Label, Form, Left, Right, Text as NativeText, Body, Title } from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import { authenticated, finishedSignup } from "../../actions/signup/auth.js";
import { connect } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import Config from "react-native-config";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';

const { width, height } = Dimensions.get("window");

class SignupPageHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        phoneNumber: "",
        formattedValue: "",
        email: "",
        showAlertOne: false,
        showAlertTwo: false,
        userInfo: null
    }
    this.phoneInput = React.createRef(null);
}
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {

            console.log('Authorization status:', authStatus);

            const _signIn = async () => {
                try {
                    await GoogleSignin.hasPlayServices();
        
                    const userInfo = await GoogleSignin.signIn();
        
                    const fcmToken = await messaging().getToken();
        
                    if (userInfo && fcmToken) {
                        axios.post(`${Config.ngrok_url}/save/oauth/google/user`, {
                            email: userInfo.user.email,
                            fullName: userInfo.user.name,
                            google_id: userInfo.user.id,
                            google_pic: userInfo.user.photo,
                            firebasePushNotificationToken: fcmToken
                        }).then((res) => {
                            console.log("Res.data", res.data);
                            
                            if (res.data.message === "Successfully registered new user!") {
            
                                this.props.authenticated(res.data.data);
                    
                                this.props.finishedSignup(true);
            
                                setTimeout(() => {
                                    this.props.props.navigation.navigate("homepage-main");
                                },  750);
                            } else {
                                console.log("Err", res.data);
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
        
                } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                        console.log("user cancelled the login flow");
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                        console.log("sing in progress already");
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                        console.log("play services not available or outdated");
                    } else {
                        // some other error happened
                        console.log("other err happened.", error)
                    }
                }
            };

            _signIn();
        } else {
            const _signIn = async () => {
                try {
                    await GoogleSignin.hasPlayServices();
        
                    const userInfo = await GoogleSignin.signIn();
        
                    if (userInfo) {
                        axios.post(`${Config.ngrok_url}/save/oauth/google/user`, {
                            email: userInfo.user.email,
                            fullName: userInfo.user.name,
                            google_id: userInfo.user.id,
                            google_pic: userInfo.user.photo
                        }).then((res) => {
                            console.log("Res.data", res.data);
                            
                            if (res.data.message === "Successfully registered new user!") {
            
                                this.props.authenticated(res.data.data);
                    
                                this.props.finishedSignup(true);
            
                                setTimeout(() => {
                                    this.props.props.navigation.navigate("homepage-main");
                                },  750);
                            } else {
                                console.log("Err", res.data);
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
        
                } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                        console.log("user cancelled the login flow");
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                        console.log("sing in progress already");
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                        console.log("play services not available or outdated");
                    } else {
                        // some other error happened
                        console.log("other err happened.", error)
                    }
                }
            };

            _signIn();
        }
    }
    handleEmailContinuation = () => {
        const { email } = this.state;

        if (typeof email !== "undefined" && email.length > 0) {
            axios.post(`${Config.ngrok_url}/send/confirmation/email`, {
                email
            }).then((res) => {
                if (res.data.message === "Successfully sent email!") {

                    const { code } = res.data;

                    this.props.authenticated({
                        email: email.toLowerCase(),
                        code,
                        page: 2
                    });

                    this.setState({
                        email: ""
                    })

                    setTimeout(() => {
                        this.props.props.navigation.navigate("email-verification-code");
                    },  1250);
                } else {

                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.setState({
                showAlertTwo: true
            })
        }
    }
    handlePhoneNumberContinuation = () => {
        const { phoneNumber } = this.state;

        const callingCode = this.phoneInput.current.getCallingCode();

        if (typeof phoneNumber !== "undefined" && phoneNumber.length > 0) {
            axios.post(`${Config.ngrok_url}/send/confirmation/phone`, {
                phoneNumber,
                callingCode
            }).then((res) => {
                if (res.data.message === "Code was successfully sent!") {

                    this.props.authenticated({
                        phoneNumber: this.state.formattedValue, 
                        unformatted: phoneNumber.trim(),
                        page: 2,
                        authyID: res.data.authyID
                    })

                    this.setState({
                        phoneNumber: ""
                    })

                    setTimeout(() => {
                        this.props.props.navigation.navigate("phone-number-verification-code");
                    },  500);
                } else {

                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.setState({
                showAlertOne: true
            })
        }
    }
    render() {
        console.log("this.state homepage", this.state);
        return (
            <Fragment>
                <View style={styles.container}>
                    <AwesomeAlert
                        show={this.state.showAlertOne}
                        showProgress={false}
                        title="Warning!"
                        message="You MUST complete the 'phone number' field before proceeding..."
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false} 
                        onDismiss={() => {
                            this.setState({
                                showAlertOne: false
                            })
                        }}
                    />
                    <AwesomeAlert
                        show={this.state.showAlertTwo}
                        showProgress={false}
                        title="Warning!"
                        message="You MUST complete the 'email' field before proceeding..."
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false} 
                        onDismiss={() => {
                            this.setState({
                                showAlertTwo: false
                            })
                        }}
                    />
                    
                    
                    <Container style={styles.tabContainer}>
                        <Header>
                            <Left>
                                <Button onPress={() => {
                                    this.props.props.navigation.goBack();
                                }} transparent>
                                    <Image source={require("../../assets/icons/go-back.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                                    <NativeText style={{ color: "black" }}>Go Back</NativeText>
                                </Button>
                               
                            </Left>
                        </Header>
                        <Header hasTabs />
                            <Tabs style={styles.tabs}>
                                <Tab heading="Phone">
                                    
                                    <PhoneInput 
                                        ref={this.phoneInput}
                                        containerStyle={styles.inputPhone}
                                        value={this.state.phoneNumber}
                                        defaultValue={this.state.phoneNumber}
                                        defaultCode="US"
                                        layout="first"
                                        onChangeText={(text) => {
                                            this.setState({
                                                phoneNumber: text
                                            })
                                        }}
                                        onChangeFormattedText={(text) => {
                                            this.setState({
                                                formattedValue: text
                                            })
                                        }}
                                        withDarkTheme
                                        withShadow
                                    />
                                    <View style={styles.btnContainer}>
                                        <Button onPress={this.handlePhoneNumberContinuation} style={styles.button} bordered>
                                            <Text>Submit</Text>
                                        </Button>
                                    </View>
                                    <View style={styles.centered}>
                                        <Text style={{ fontSize: 18, marginBottom: 15 }}>Sign in quicker with google or facebook!</Text>
                                        <GoogleSigninButton
                                            style={{ width: width * 0.80, height: 48 }}
                                            size={GoogleSigninButton.Size.Wide}
                                            color={GoogleSigninButton.Color.Dark}
                                            onPress={this.requestUserPermission}
                                            disabled={this.state.isSigninInProgress} 
                                        />
                                    </View>
                                </Tab>
                                <Tab heading="Email">
                                    <Form>
                                        <Item floatingLabel>
                                        <Label>Email Address</Label>
                                        <Input style={styles.customInput} value={this.state.email} onChangeText={(value) => {
                                            this.setState({
                                                email: value
                                            })
                                        }} />
                                        </Item>
                                    </Form>
                                    <View style={styles.btnContainer}>
                                        <Button onPress={this.handleEmailContinuation} style={[styles.button, { marginTop: 28 }]} bordered>
                                            <Text>Submit</Text>
                                        </Button>
                                    </View>

                                    <View style={styles.centered}>
                                        <Text style={{ fontSize: 18, marginBottom: 15 }}>Sign in quicker with google or facebook!</Text>
                                        <GoogleSigninButton
                                            style={{ width: width * 0.80, height: 48 }}
                                            size={GoogleSigninButton.Size.Wide}
                                            color={GoogleSigninButton.Color.Dark}
                                            onPress={this.requestUserPermission}
                                            disabled={this.state.isSigninInProgress} 
                                        />
                                    </View>
                                </Tab>
                            
                            </Tabs>
                    </Container>
                </View>
                <View style={styles.bottomContainer}>
                    <Text>Already have an account? <Text style={styles.signinText} onPress={() => {
                        this.props.props.navigation.navigate("sign-in");
                    }}>Sign In!</Text></Text>
                </View>
            </Fragment>
        )
    }
}
export default connect(null, { authenticated, finishedSignup })(SignupPageHelper);