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
    selectedCountry: {
        marginTop: 15,
        color: "#8884FF",
        fontWeight: "bold",
        fontSize: 18
    },
    marginTop30: {
        marginTop: 30
    },
    dlText: {
        fontSize: 18,
        textAlign: "left"
    },
    dateButton: {
        width: width * 0.75,
        justifyContent: "center"
    }
})