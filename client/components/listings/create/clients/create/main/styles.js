import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    iconSmaller: {
        maxWidth: 25,
        maxHeight: 25
    },
    borderedButton: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.80
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    activeListingText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    cardCustom: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        flex: 0
    }
});
    