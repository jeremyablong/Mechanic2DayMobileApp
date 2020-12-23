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
            if (res.data) {

            } else {

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <ImageBackground source={require("../../assets/images/car-4.jpg")} style={styles.container}>
               
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
        </Fragment>
    );   
}
export default SigninHelper;