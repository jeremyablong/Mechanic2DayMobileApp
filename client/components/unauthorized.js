import React, { Fragment } from 'react';
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


const { width, height } = Dimensions.get("window");

const Unauthorized = (props) => {
    return (
        <Fragment>
            <ImageBackground style={{ width, height, justifyContent: "center", alignItems: "center", alignContent: "center" }} source={require("../assets/images/unauthorized-2.jpg")}>
                <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 20 }}>
                    <Text style={{ textDecorationLine: "underline", fontSize: 45, color: "white", fontWeight: "bold", textAlign: "center" }}><Text style={{ color: "#8884FF" }}>Unauthorized</Text> Access</Text>
                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 18 }}>You do not have the correct permissions to view this page - it is very likely that you are not logged-in so please login and try this action again.</Text>
                    <View style={{ borderBottomColor: "white", borderBottomWidth: 1, marginBottom: 30 }} />
                    <AwesomeButtonRick onPress={() => {
                        props.navigation.goBack();
                    }} width={width * 0.75} type="secondary">Return to previous screen</AwesomeButtonRick>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
export default Unauthorized;