import React, { useState, Fragment } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import styles from './styles.js';
import Config from "react-native-config";
import { Header, Left, Button as NativeBtn, Text as NativeText } from 'native-base';
import FooterHelper from "../footer/footer.js";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../toastConfig.js";
import { connect } from "react-redux";
import { authenticated, finishedSignup } from "../../actions/signup/auth.js";
import { sendbirdLogin } from "../../actions/sendbird/user.js";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import messaging from '@react-native-firebase/messaging';


const { height, width } = Dimensions.get("window");

const SigninHelper = props => {
    const [account, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, changeVisibility] = useState(true);

    const handleSubmission = () => {
        console.log("handleSubmission");

        axios.post(`${Config.ngrok_url}/sign-in`,{
            email_phone: account,
            password
        }).then((res) => {
            if (res.data.message === "Successfully authenticated!") {

                const { user } = res.data;

                props.sendbirdLogin({ userId: user.unique_id, nickname: user.fullName});

                props.authenticated(user);

                props.finishedSignup(true);

                setTimeout(() => {
                    props.props.navigation.push("homepage-main");
                },  500);
            } else {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "ERROR! 🚫",
                    text2: "The credentials provided did not match any records in our system, please double check your credentials.",
                    visibilityTime: 5000
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {

            console.log('Authorization status:', authStatus);

            const fcmToken = await messaging().getToken();

            const _signIn = async () => {
                try {
                    await GoogleSignin.hasPlayServices();
        
                    const userInfo = await GoogleSignin.signIn();
        
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
            
                                props.authenticated(res.data.data);
                    
                                props.finishedSignup(true);
            
                                setTimeout(() => {
                                    props.props.navigation.push("homepage-main");
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
            
                                props.authenticated(res.data.data);
                    
                                props.finishedSignup(true);
            
                                setTimeout(() => {
                                    props.props.navigation.push("homepage-main");
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
    return (
        <Fragment>
            <Header>
                <Left>
                    <NativeBtn onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../assets/icons/go-back.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        <NativeText style={{ color: "black" }}>Go Back</NativeText>
                    </NativeBtn>
                    
                </Left>
            </Header>
            <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
            <ImageBackground source={require("../../assets/images/car-4.jpg")} style={styles.container}>
                
                <Text style={styles.signinText}>Sign in</Text>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}    
                    placeholderTextColor={"grey"}
                    placeholder="Email Or Phone Number"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email_phone) => {
                        setAccountType(email_phone);
                    }}/>
                <Image style={styles.inputIcon} source={require("../../assets/icons/account.png")}/>
                </View>
                
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs} 
                    placeholderTextColor={"grey"}
                    placeholder="Password"
                    secureTextEntry={visibility}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => {
                        setPassword(password);
                    }}/>
                    <TouchableOpacity onPress={() => {
                        changeVisibility(!visibility);
                    }}>
                        <Image style={styles.inputIcon} source={require("../../assets/icons/eye.png")}/>
                    </TouchableOpacity>
                </View>

                <GoogleSigninButton
                    style={{ width: width * 0.80, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={requestUserPermission}
                />

                <TouchableOpacity style={[styles.btnForgotPassword, { marginTop: 15 }]} onPress={() => {

                }}>
                    <Text style={styles.btnText}>Forgot your password?</Text>
                </TouchableOpacity>

                <AwesomeButtonBlue progress type="secondary" width={width * 0.75} onPress={(next) => {
                    handleSubmission();

                    next();
                }}>
                <Text style={styles.loginText}>Login</Text>
                </AwesomeButtonBlue>


                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                    props.props.navigation.navigate("homepage");
                }}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </ImageBackground>
            <FooterHelper props={props.props} />
        </Fragment>
    );   
}
export default connect(null, { authenticated, finishedSignup, sendbirdLogin })(SigninHelper);