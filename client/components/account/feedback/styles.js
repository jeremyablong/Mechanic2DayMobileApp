import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    container: {
        width,
        height,
        zIndex: -1,
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    mainText: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "left"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    smallerText: {
        fontSize: 18
    },
    boxedOutline: {
        minHeight: 100,
        maxHeight: 100,
        marginTop: 15,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 3,
        borderColor: "#8884FF"
    },
    boxed: {
        minHeight: 100,
        maxHeight: 100,
        marginTop: 15,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    textInput: {
        minHeight: 125
    }
})