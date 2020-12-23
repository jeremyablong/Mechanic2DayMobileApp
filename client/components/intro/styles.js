import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    slide: {
        width,
        maxWidth: width,
        height
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 2,
        borderColor: "black",
        position: "absolute",
        bottom: 70,
        margin: 15,
        shadowColor: "black",
        padding: 20,
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24
    },
    wrapper: {
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: 20,
        textAlign: "center"
    },
    vector: {
        maxWidth: width,
        maxHeight: height
    }
})