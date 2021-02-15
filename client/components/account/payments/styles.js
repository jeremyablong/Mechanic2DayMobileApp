import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    icon: {
        maxWidth: 45,
        maxHeight: 45
    },
    listItem: {
        maxHeight: 70
    },
    container: {
        backgroundColor: "white",
        minHeight: height
    },
    lastListItem: {
        minHeight: 70,
        maxHeight: 70
    },
    margin: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    absolute: {
        position: "absolute",
        bottom: 10,
        right: 10
    },
    row: {
        flexDirection: "row"
    }
})