import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: 1000,
        width,
        backgroundColor: "white",
        flexGrow: 0
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    iconSmaller: {
        maxWidth: 25,
        maxHeight: 25
    },
    headerMain: {
        textAlign: "center",
        fontSize: 26, 
        fontWeight: "bold", 
        color: "blue" 
    },
    submitButton: {
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center", 
        marginTop: 15
    }
});
    