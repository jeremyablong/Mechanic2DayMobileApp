import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    icon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        flex: 1
    },
    margin: {
        margin: 20
    },
    heading1: {
        fontSize: 30
    },
    row: {
        flexDirection: 'row'
    },
    cardText: {
        fontSize: 18
    },  
    largeColumn: {
        width: width * 0.65,
        flexDirection: "row"
    },
    smallColumn: {
        width: width * 0.35,
        flexDirection: "row"
    },
    profilePicOne: {
        maxWidth: 80,
        borderRadius: 45,
        maxHeight: 80
    },
    underline: {
        textDecorationLine: "underline"
    },
    location: {
        textDecorationLine: "underline",
        marginLeft: 10
    },
    starSmall: {
        maxWidth: 15, 
        maxHeight: 15, 
        marginRight: 10
    },
    hr: {
        borderBottomWidth: 1,
        marginTop: 25,
        marginBottom: 25,
        borderBottomColor: "grey"
    }
})