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
    margin: {
        margin: 20
    },
    listIcon: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    texter: {
        fontSize: 18
    },
    bottomPosition: {
        position: "absolute",
        bottom: 0
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10
    }
})