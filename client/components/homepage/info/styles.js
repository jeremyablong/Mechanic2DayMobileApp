import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1
    },
    innerContainer: {
        minHeight: 275,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -50
    },
    bigger: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },
    smaller: {
        textAlign: "center",
        fontSize: 18
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginBottom: 25
    }
})