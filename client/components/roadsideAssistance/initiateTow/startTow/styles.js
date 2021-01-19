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
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    customButton: {
        width: width * 0.75,
        justifyContent: "center"
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 20
    },
    map: {
        width: "100%",
        height: height * 0.40,
        marginTop: 20
    },
    topBottomMargin: {
        marginTop: 15, 
        marginBottom: 15
    }
})