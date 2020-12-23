import React, { Fragment, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import styles from "./styles.js";
import { connect } from "react-redux";
import { authenticated } from "../../../actions/signup/auth.js";

const CreateNamePasswordHelper = (props) => {
    const [showPassword, setShowPassword] = useState(true);
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const continueToNextPage = () => {
        console.log("continueToNextPage");
        
        props.authenticated({
            ...props.previous, name: fullName, password, page: 4
        });

        setTimeout(() => {
            props.props.navigation.navigate("create-birthday");
        },  500);
    }
    return (
        <Fragment>
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.backBack}>
                    <Image source={require("../../../assets/icons/outline.png")} style={{ maxWidth: 175, maxHeight: 175 }} />
                    <Text style={styles.fullText}>Please fill out your full name and password</Text>
                    <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Full Name (First + Last)"
                        placeholderTextColor={"grey"}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => {
                            setFullName(name);
                        }}/>
                        <Image style={styles.inputIcon} source={require("../../../assets/icons/user.png")}/>
                    </View>
                    
                    <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password" 
                        placeholderTextColor={"grey"}
                        secureTextEntry={showPassword}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => {
                            setPassword(password);
                        }}/>
                        <TouchableOpacity onPress={() => {
                            setShowPassword(!showPassword);
                        }}>
                            <Image style={styles.inputIcon} source={require("../../../assets/icons/eye.png")}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={continueToNextPage} style={[styles.buttonContainer, styles.loginButton]}>
                    <Text style={styles.loginText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
const mapStateToProps = state => {
    return {
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(CreateNamePasswordHelper);