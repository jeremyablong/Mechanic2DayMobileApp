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
    absolutelyCentered: {
        marginTop: 15
    },
    map: {
        width,
        height: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})