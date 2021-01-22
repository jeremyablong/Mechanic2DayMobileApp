import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        minHeight: height,
        width, 
        backgroundColor: "white"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    customButton: {
        width: width * 0.85,
        justifyContent: "center"
    },
    lessThan: {
        fontSize: 16, 
        color: "darkblue", 
        textAlign: "center", 
        margin: 20
    }
})