import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height,
        width,
        backgroundColor: "white"
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    picker: {
        width,
        minHeight: 75
    },
    margin: {
        margin: 20
    },
    mediumText: {
        fontSize: 18
    },
    marginCentered: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    greyButton: {
        width: width * 0.90,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "lightgrey"
    },
    buttonSpecial: {
        width: width * 0.90,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});
    