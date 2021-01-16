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
    companyNames: {
        fontWeight: "bold", 
        fontSize: 18, 
        textAlign: "center", 
        textDecorationLine: "underline"
    },
    myCustomBtn: {
        width: width * 0.85,
        justifyContent: "center"
    },
    threeSideMargin: {
        marginLeft: 20, 
        marginTop: 20, 
        textAlign: "center", 
        marginRight: 20
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    minorMargin: {
        marginTop: 2,
        marginBottom: 2
    },
    selector: {
        width: width * 0.80
    },
    margin: {
        margin: 20
    },
    mainText: {
        fontSize: 24,
        marginBottom: 20,
        textDecorationLine: "underline",
        textAlign: "center"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2
    },
    textDriver: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
        marginTop: 5
    },
    item: {
        width: width * 0.60
    }
})