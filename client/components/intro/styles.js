import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    slide: {
        maxWidth: width,
        height,
        width: "100%",
        resizeMode: "stretch",
        flex: 1
    },
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderWidth: 2,
        borderColor: "black",
        position: "absolute",
        top: 10,
        margin: 15,
        shadowColor: "black",
        padding: 20,
        borderRadius: 25,
        minHeight: 300,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center"
    },
    wrapper: {
        flex: 1
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2
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