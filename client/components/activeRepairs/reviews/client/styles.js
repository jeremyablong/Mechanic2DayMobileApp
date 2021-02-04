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
        backgroundColor: "white",
        zIndex: -1
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    margin: {
        margin: 20
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 55, 
        marginBottom: 15 
    },
    hrTwo: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15, 
        marginBottom: 15 
    },
    headerText: {
        fontSize: 18, 
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row"
    },
    hugeText: {
        fontSize: 30, 
        fontWeight: "bold"
    },
    listitem: {
        height: 65
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "left"
    },
    column: {
        width: width * 0.30,
        flexDirection: "column"
    },
    flexBeginning: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    icon: {
        maxHeight: 50,
        maxWidth: 50
    },
    textInput: {
        borderColor: "grey",
        borderWidth: 1,
        padding: 10
    },
    titleText: {
        marginBottom: 15,
        fontSize: 18, 
        fontWeight: "bold"
    },
    lightIcon: {
        tintColor: "white",
        maxHeight: 75,
        maxWidth: 75
    },
    textText: {
        textAlign: "center", 
        marginTop: 10,
        fontSize: 16 ,
        fontWeight: "bold"
    },
    circle: {
        borderRadius: 50, 
        height: 100,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: 100,
        borderWidth: 2,
        borderColor: "black"
    },
    darkCircle: {
        borderRadius: 50, 
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: 100,
        borderWidth: 10,
        borderColor: "#8884FF"
    }
})