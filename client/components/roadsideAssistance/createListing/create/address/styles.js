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
    importantInstructional: {
        fontSize: 16,
        marginTop: 20
    },
    spinnerTextStyle: {
        color: "white", 
        fontWeight: "bold", 
        textAlign: "center"
    },
    buttonCustom: {
        width: width * 0.45,
        justifyContent: "center",
        marginTop: 25
    },
    displayImage: {
        minWidth: width * 0.95,
        minHeight: 300,
        marginTop: 30
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    selectedArea: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 15,
        color: "blue",
        textDecorationLine: "underline",
        textAlign: "left"
    },
    selected: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 20
    },
    absoluteBottom: {
        position: "absolute",
        bottom: 10,
        margin: 20,
        left: 0,
        right: 0
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15, 
        marginBottom: 15
    },
    listItemTwo: {
        minHeight: 35,
        padding: 10
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold"
    }
})