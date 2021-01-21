import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        height,
        width, 
        backgroundColor: "white"
    },
    listIcon: {
        maxWidth: 30,
        maxHeight: 30
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    listitemCustom: {
        width
    },
    margin: {
        margin: 20
    },
    bottom: {
        position: "absolute", 
        bottom: 15, 
        left: 0, 
        right: 0
    },
    header: {
        fontSize: 16,
        marginBottom: 25,
        textAlign: "center"
    },
    width75: {
        width: width * 0.75,
        justifyContent: "center"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10
    }
})