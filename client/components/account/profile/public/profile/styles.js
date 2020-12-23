import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    right: {
        position: "absolute",
        right: 0
    },
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    innerTextOne: {
        fontSize: 30
    },
    marginSpace: {
        margin: 20
    },
    secondText: {
        fontSize: 16,
        marginTop: 15
    },
    rightIcon: {
        maxWidth: 25, 
        maxHeight: 25, 
        position: "absolute", 
        right: 25
    },
    shortHr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 30,
        maxWidth: 100
    },
    descriptionText: {
        fontSize: 18
    },
    quotesIcon: {
        maxWidth: 40, 
        maxHeight: 40
    },  
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    biggerTextSub: {
        fontSize: 20
    },
    minWidthInput: {
        minWidth: "100%"
    },
    h3: {
        fontSize: 20, 
        fontWeight: "bold"
    },
    listItemSpecial: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    profilePicture: {
        maxWidth: 75,
        maxHeight: 75,
        borderRadius: 50,
        marginLeft: 30
    },
    skelatonRow: {
        height: 30,
        width: "90%",
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20
    },
    box: {
        width: "90%",
        margin: 20,
        height: 250
    },
    topRight: {
        position: "absolute",
        right: 5,
        maxWidth: 45,
        top: 5
    },
    h6: {
        fontSize: 16
    },
    innerContainer: {
        height,
        width,
        backgroundColor: "white",
        flex: 1
    },
    nextContainer: {
        flexDirection: "row"
    },
    column: {
        flexDirection: 'column'
    },
    spaceLeftText: {
        marginLeft: 10
    },
    verified: {
        maxHeight: 35,
        maxWidth: 35
    },
    customRow: {
        flexDirection: "row",
        marginTop: 20
    },
    helperIcon: {
        maxWidth: 20,
        maxHeight: 20
    },
    iconTextHelper: {
        fontSize: 18,
        marginLeft: 15
    }
})