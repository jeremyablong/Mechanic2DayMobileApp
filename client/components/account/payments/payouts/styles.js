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
    topText: {
        fontSize: 18,
        marginTop: 40
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
    listStyle: {
        backgroundColor: "white",
        zIndex: 9999
    },
    inputContainer: {
        backgroundColor: "white",
        zIndex: 9999
    },
    margin: {
        margin: 20
    },
    maxedImage: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    listitem: {
       minHeight: 145,
       width: width * 0.85
    },
    label: {
        fontSize: 18,
        marginTop: 15
    },
    default: {
        backgroundColor: "lightgrey",
        padding: 7,
        marginTop: 15,
        maxWidth: 75
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginBottom: 15, 
        marginTop: 15
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        margin: 20,
        right: 0
    }
})