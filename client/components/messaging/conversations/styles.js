import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    listitem: {
        width: width * 0.95
    }
});
           