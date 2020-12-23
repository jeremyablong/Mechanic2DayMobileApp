import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    topContainer: {
        flex: 1,
        minHeight: 110,
        maxHeight: 110,
        backgroundColor: "white",
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        flexDirection: "row"
    },
    touchable: {
        zIndex: 99999
    },
    subText: {
        color: "darkblue",
        fontSize: 17
    },
    inlineIcon: {
        maxWidth: 33,
        maxHeight: 33
    },
    listItem: {
        maxHeight: 50
    },
    bigger: {
        fontSize: 20
    },
    name: {
        fontSize: 30,
        fontWeight: "bold"
    },  
    profilePic: {
        maxWidth: 65,
        maxHeight: 65,
        borderRadius: 40,
        marginTop: 30,
        marginLeft: 20
    },
    nameContainer: {
        marginTop: 30,
        marginLeft: 20
    },
    divider: {
        backgroundColor: "#e3e1e1",
        maxHeight: 100
    }
})