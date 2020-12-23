import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    listItem: {
        minHeight: 70
    },
    container: {
        backgroundColor: "white",
        height, 
        flex: 1
    },
    center: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 50
    },  
    btnContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    specialIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    listItemCustom: {
        minHeight: 70,
        maxHeight: 70
    },
    greyButton: {
        backgroundColor: "lightgrey",
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.80,
        justifyContent: "center"
    },
    greenButton: {
        backgroundColor: "#5cb85c",
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.80,
        justifyContent: "center"
    }
})