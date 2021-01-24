import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        height: height - (Platform === "ios" ? 64 : 56),
        width, 
        backgroundColor: "white"
    }
})