import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        width
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    starIcon: {
        maxWidth: 15,
        maxHeight: 15
    },
    cardie: {
        flex: 0, 
        marginBottom: 30,
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22
    }
})