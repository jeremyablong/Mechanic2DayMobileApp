import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    container: {
        backgroundColor: "white",
        height,
        width
    },
    margin: {
        margin: 20
    },
    hrSpace: {
        marginTop: 15, 
        marginBottom: 15, 
        borderBottomColor: "lightgrey", 
        borderBottomWidth: 1
    }
})