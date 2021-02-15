import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height: "100%",
        width,
        backgroundColor: "white",
        zIndex: -1
    },
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    innerIcon: {
        maxWidth: "100%", 
        maxHeight: "100%"
    },
    listitem: {
        width: width
    },
    absolute: {
        position: "absolute",
        top: 10,
        right: 10
    }
});
    