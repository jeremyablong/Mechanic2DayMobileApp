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
    normalText: {
        fontSize: 18
    },
    mechanicIcon: {
        maxWidth: 45, 
        maxHeight: 45,
        marginTop: 25
    },
    absolutely: {
        maxWidth: 150, 
        maxHeight: 50, 
        flexDirection: "row",
        marginTop: 10,
        position: "absolute",
        bottom: 10,
        left: 10
    },
    absolutelyTop: {
        maxWidth: 150, 
        maxHeight: 50, 
        flexDirection: "row",
        marginTop: 10,
        position: "absolute",
        top: 10,
        left: 10
    },
    whiteText: {
        marginTop: 15, 
        fontSize: 18, 
        color: "black", 
        fontWeight: "bold"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 20, 
        marginBottom: 20
    },
    boxHeader: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 15
    },
    box: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "lightgrey",
        padding: 10,
        minHeight: 180,
        height: 180,
        shadowColor: "lightgrey",
        shadowOffset: {
            width: 4,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19
    },
    columnOne: {
        width: width * 0.15
    },
    columnTwo: {
        width: width * 0.65
    },
    headerText: {
        textAlign: "left",
        fontSize: 30,
        fontWeight: "bold"
    },
    transparentBackground: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 30,
        borderRadius: 40,
        borderWidth: 2, 
        borderColor: "white"
    },
    centeredAbsolute: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 0
    },
    largerText: {
        color: "white", 
        fontWeight: "bold", 
        fontSize: 35,
        textAlign: "center"
    },
    largeText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    margin: {
        margin: 20
    }
})