import React, { useState, Fragment } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import { Button, Text as NativeText } from "native-base";
import { authenticated, finishedSignup } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";
import axios from "axios";
import Config from "react-native-config";
import { sendbirdLogin } from "../../../actions/sendbird/user.js";

const CreateAccountTypeHelper = (props) => {
    const continueToNextPage = (selection) => {
        console.log("continueToNextPage");

        const { previous } = props;

        axios.post(`${Config.ngrok_url}/register/user`, {
            address: previous.address,
            authyID: previous.authyID,
            birthdate: previous.birthdate,
            gender: previous.gender,
            fullName: previous.name,
            password: previous.password,
            unformatted: previous.unformatted ? previous.unformatted : null,
            phoneNumber: previous.phoneNumber ? previous.phoneNumber : "",
            email: previous.email ? previous.email : "",
            wholeAddress: previous.wholeAddress,
            accountType: selection
        }).then((res) => {
            if (res.data.message === "Successfully registered new user!") {
                console.log(res.data);

                const { data } = res.data;

                props.authenticated(data);

                props.sendbirdLogin({ userId: data.unique_id, nickname: data.fullName });

                props.finishedSignup(true);

                setTimeout(() => {
                    props.props.navigation.navigate("homepage-main");
                },  500);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        props.authenticated({
            ...props.previous, accountType: selection, page: 8
        })
    }
    return (
        <Fragment>
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.backBackground}>
                    <Image source={require("../../../assets/icons/profile.png")} style={styles.accountImage} />
                    <Text style={styles.mainText}>Are you a mechanic OR looking to get work done?</Text>
                    <View style={styles.center}>
                        <Button bordered onPress={() => {
                            continueToNextPage("mechanic");
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I'm a mechanic</NativeText>
                        </Button>
                        <Button bordered dark onPress={() => {
                            continueToNextPage("client");
                        }} style={styles.submitBtn}>
                            <NativeText style={{ color: "black" }}>I'm looking to repair my vehicle</NativeText>
                        </Button>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => {
                            props.props.navigation.navigate("location-create");
                        }}>
                            <Text style={styles.goBack}>Go Back...</Text>
                        </TouchableOpacity>
                        
                    </View>
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
export default connect(mapStateToProps, { authenticated, finishedSignup, sendbirdLogin })(CreateAccountTypeHelper);
