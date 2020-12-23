import React, { Component, Fragment } from "react";
import { View, Text, Dimensions, ScrollView, ImageBackground, Image } from "react-native";
import styles from "./styles.js";
import Carousel from 'react-native-snap-carousel';
import { Button, Text as NativeText } from 'native-base';
import { TouchableOpacity } from "react-native-gesture-handler";
import { authenticated } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";


const { width, height } = Dimensions.get("window");

class GenderSelection extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        data: [{
            label: "Male",
            value: "male",
            id: 1
        }, {
            label: "Female",
            value: "female",
            id: 2
        }, {
            label: "Trans",
            value: "trans",
            id: 3
        }, {
            label: "Gender neutral",
            value: "gender-neutral",
            id: 4
        }, {
            label: "Non-binary",
            value: "non-binary",
            id: 5
        }, {
            label: "Agender",
            value: "agender",
            id: 6
        }, {
            label: "Pangender",
            value: "pangender",
            id: 7
        }, {
            label: "Gender-queer",
            value: "gender-queer",
            id: 4
        }, {
            label: "Two-spirit",
            value: "two-spirit",
            id: 5
        }, {
            label: "Third gender",
            value: "third-gender",
            id: 6
        }, {
            label: "Prefer Not To Answer",
            value: "prefer-not-to-answer",
            id: 7
        }]
    }
}
    handleSelection = (selection) => {
        console.log("selection", selection);

        this.props.authenticated({
            ...this.props.previous, gender: selection.value, page: 6
        })

        setTimeout(() => {
            this.props.props.navigation.navigate("location-create");
        },  500);
    }
    render () {
        return (
            <Fragment>
                <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.background}>
                <ScrollView contentContainerStyle={styles.containerContent}>
                    <View style={styles.backgroundCentered}>
                        <Image source={require("../../../assets/icons/gender.png")} style={{ maxWidth: 175, marginBottom: 40, maxHeight: 175 }} />
                        <Text style={styles.header}>Please select your gender...</Text>
                        {this.state.data.map((each, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <View>
                                        <Button onPress={() => {
                                            this.handleSelection(each);
                                        }} style={styles.genderBtn}>
                                            <NativeText style={{ color: "black" }}>{each.label}</NativeText>
                                        </Button>
                                    </View>
                                );
                            } else {
                                return (
                                    <View>
                                        <Button onPress={() => {
                                            this.handleSelection(each);
                                        }} style={styles.genderBtnTwo}>
                                            <NativeText style={{ color: "white" }}>{each.label}</NativeText>
                                        </Button>
                                    </View>
                                );
                            }
                        })}
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.navigate("create-birthday");
                        }}><Text style={styles.goBack}>Go Back...</Text></TouchableOpacity>
                    </View>
                </ScrollView> 
                </ImageBackground>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(GenderSelection);