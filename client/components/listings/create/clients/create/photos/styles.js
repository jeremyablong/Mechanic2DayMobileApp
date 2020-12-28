import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: 1000,
        width,
        backgroundColor: "white",
        flexGrow: 0
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    iconSmaller: {
        maxWidth: 25,
        maxHeight: 25
    },
    margin: {
        margin: 20
    },
    absolutePosition: {
        position: 'absolute', 
        bottom: 10, 
        left: 10 
    },
    rowRow: {
        flexDirection: "row",
        maxWidth: width * 0.80
    },
    textMediumWhite: {
        fontSize: 18,
        color: "white"
    },
    customSlideUpContainer: {
        height,
        width,
        backgroundColor: "black"
    },
    gallery: {
        flex: 1, 
        minWidth: width * 0.90, 
        minHeight: 350, 
        maxHeight: 350, 
        backgroundColor: 'black'
    },
    customMargin: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    buttonCustomThree: {
        backgroundColor: "#5cb85c",
        width: width * 0.80,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    buttonCustomTwo: {
        backgroundColor: "blue"
    },
    mainHeadingTwo: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold"
    },
    mediumSizeText: {
        fontSize: 18
    },
    mainHeading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    customSlideUpContainerWhite: {
        height,
        width,
        backgroundColor: "black"
    },
    longerColumn: {
        width: width * 0.75
    },
    shortColumn: {
        width: width * 0.25
    },
    iconWhite: {
        tintColor: "white",
        maxWidth: 45,
        maxHeight: 45
    }
});
    