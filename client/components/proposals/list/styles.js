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
    openWidth: {
        width: width * 0.85,
        backgroundColor: "#E8CEE4",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 2,
        borderColor: "black"
    },  
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
})