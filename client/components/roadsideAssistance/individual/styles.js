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
    postDescription: {
        fontSize: 20
    },
    map: {
        width: "100%",
        height: 225
    },
    tag: {
        borderRadius: 60,
        backgroundColor: "lightgrey",
        borderWidth: 2,
        borderColor: "black",
        margin: 10,
        padding: 12
    },
    insuranceHeader: {
        fontSize: 30, 
        textDecorationLine: "underline",
        fontWeight: "bold"
    },
    innerTag: {
        color: "black", 
        fontWeight: "bold", 
        fontSize: 22
    },
    driverHeader: {
        textDecorationLine: "underline",
        color: "black", 
        fontWeight: "bold", 
        fontSize: 22,
        marginBottom: 15
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    underlinedMedium: {
        marginTop: 10,
        textDecorationLine: "underline",
        color: "darkblue"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10
    }
})