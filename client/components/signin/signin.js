import React, { useState, Fragment } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground
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
                    props.props.navigation.navigate("homepage-main");
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

                <TouchableOpacity style={styles.btnForgotPassword} onPress={() => {

                }}>
                    <Text style={styles.btnText}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
                    handleSubmission();
                }}>
                <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>


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