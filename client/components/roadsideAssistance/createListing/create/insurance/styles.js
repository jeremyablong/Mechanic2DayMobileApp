import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    margin: {
        margin: 20
    },
    cameraButton: {
        width: "100%",
        justifyContent: "center"
    },
    finalButton: {
        width: width * 0.90,
        justifyContent: "center"
    },
    innerButtonText: {
        fontWeight: "bold",
        color: "white"
    },
    customText: {
        fontWeight: 'bold', 
        fontSize: 18,
        marginBottom: 20
    },
    item: {
        maxWidth: width * 0.80
    },
    gallery: {
        minWidth: width,
        maxWidth: width,
        minHeight: 275,
        maxHeight: 275,
        marginTop: 40,
        marginBottom: 40
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    column: {
        width: width * 0.45,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
})