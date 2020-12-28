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
    locationButton: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        minWidth: "85%"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    fontMedium: {
        fontSize: 18
    }
});
    