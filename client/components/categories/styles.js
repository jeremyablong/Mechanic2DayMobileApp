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
        maxWidth: 20,
        maxHeight: 20
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
        elevation: 12
    },
    cardText: {
        fontSize: 18
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    reviewText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})