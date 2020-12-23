import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    menuIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    badge: {
        position: "absolute",
        top: 10,
        left: 5
    }
})