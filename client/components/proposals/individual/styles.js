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
    marginTopBottom: {
        marginTop: 15, 
        marginBottom: 15
    },
    minSize: {
        maxWidth: 50, 
        maxHeight: 50, 
        minWidth: 50, 
        minHeight: 50,
        borderRadius: 40
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },  
    specialButton: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.85
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    smallerHeader: {
        fontSize: 18,
        fontWeight: "bold"
    },  
    marginTopMid: {
        marginTop: 15
    },
    smallestHeader: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 15
    },
    boldWhite: { 
        color: "white", 
        fontWeight: "bold" 
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    link: {
        color: "#8884FF",
        marginTop: 15,
        marginBottom: 15,
        fontWeight: "bold"
    }
})