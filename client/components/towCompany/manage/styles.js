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
    margin: {
        margin: 20
    },
    topText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "blue", 
        marginTop: 15, 
        textAlign: "center"
    },
    hr: {
        borderBottomColor: "#e8e8e8",
        borderBottomWidth: 10,
        paddingTop: 75
    }
})