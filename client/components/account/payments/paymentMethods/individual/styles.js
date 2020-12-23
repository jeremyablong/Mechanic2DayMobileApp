import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    listItem: {
        minHeight: 70,
        maxHeight: 70,
        width,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    container: {
        backgroundColor: "white",
        height
    },
    paymentIcon: {
        maxWidth: 40, 
        maxHeight: 40
    },
    innerIcon: {
        maxWidth: 15, 
        maxHeight: 15
    },
    deleteContainer: {
        margin: 20
    }
})