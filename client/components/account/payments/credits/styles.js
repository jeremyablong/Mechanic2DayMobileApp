import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        minWidth: width,
        minHeight: height,
        backgroundColor: "white"
    },
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    listItem: {
        minHeight: 70,
        maxHeight: 70,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        marginLeft: 0,
        width: width * 0.80
    },  
    plus: {
        tintColor: "white",
        margin: 10,
        maxWidth: 25,
        maxHeight: 25
    },
    nativeTextInner: {
        color: "white", 
        fontWeight: "bold"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 20
    },
    customBtn: {
        marginBottom: 25
    },
    middle: {
        position: "absolute",
        left: 25,
        top: 25
    }
})