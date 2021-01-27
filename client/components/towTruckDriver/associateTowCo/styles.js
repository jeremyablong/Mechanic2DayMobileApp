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
        backgroundColor: "white",
        zIndex: -1
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    margin: {
        margin: 20
    },
    errorText: {
        color: "darkred",
        textAlign: "center",
        fontSize: 18
    },
    inputContainer: {
        width: width * 0.90,
        marginTop: 15
    },
    mainText: {
        marginBottom: 15,
        fontSize: 18, 
        fontWeight: "bold"
    },
    customButton: {
        width: width * 0.75,
        justifyContent: "center",
        marginTop: 20, 
        marginBottom: 40
    }
})