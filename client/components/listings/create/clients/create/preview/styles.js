import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    iconSmaller: {
        maxWidth: 25,
        maxHeight: 25
    },
    continueButton: {
        backgroundColor: "darkblue"
    },
    normalFont: {
        fontSize: 18
    }
});
    