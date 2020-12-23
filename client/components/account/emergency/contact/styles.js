import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    mainText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    standardText: {
        fontSize: 18,
        marginTop: 25
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 40
    },
    footer: {
        flexDirection: "row"
    },
    footerButton: {
        position: "absolute",
        right: 15,
        bottom: 20
    },
    innerText: {
        color: "white", 
        fontWeight: "bold"
    },
    leftBottom: {
        position: "absolute",
        left: 15,
        bottom: 20
    },
    learnMore: {
        fontSize: 20,
        color: "blue"
    }
})