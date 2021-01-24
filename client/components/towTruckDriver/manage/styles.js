import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        height: height - (Platform === "ios" ? 64 : 56),
        width, 
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 22, 
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 10
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2
    }
})