import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    icon: {
        maxWidth: 45,
        maxHeight: 45
    },
    container: {
        backgroundColor: "white",
        minHeight: height,
        width,
        zIndex: -1
    },
    mainHeaderText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    headerText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "darkblue",
        textDecorationLine: "underline"
    },
    margin: {
        margin: 20
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginBottom: 15,
        marginTop: 15
    }
})