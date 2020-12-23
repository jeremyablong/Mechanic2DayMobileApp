import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    menuIcon: {
        maxWidth: 50,
        maxHeight: 50,
        position: "absolute"
    }, 
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F8F8"
    },
    mainIcon: {
        maxWidth: width,
        maxHeight: 225
    },
    inputPhone: {
        width: "100%",
        paddingTop: 25
    },
    tabs: {
        top: -50
    },
    customInput: {
        minHeight: 75,
        paddingTop: 15
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    button: {
        width: "100%",
        justifyContent: "center",
        marginTop: 40
    },
    bottomContainer: {
        minHeight: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    signinText: {
        fontWeight: "bold",
        color: "blue"
    }
})