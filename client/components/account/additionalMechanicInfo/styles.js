import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    itemWidth: {
        width: width * 0.80
    },
    header: {
        fontSize: 18, 
        fontWeight: "bold", 
        textAlign: "center",
        textDecorationLine: "underline",
        margin: 10
    },
    marginBothWays: {
        marginTop: 20,
        marginBottom: 20
    },
    myText: {
        fontSize: 18,
        marginBottom: 8
    },
    boxed: {
        width: "100%", 
        minHeight: 150,
        height: "100%"
    },
    bold: {
        fontWeight: "bold"
    },
    hr: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
})