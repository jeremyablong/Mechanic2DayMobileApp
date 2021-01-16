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
    font15: {
        fontSize: 15
    },
    title: {
        fontSize: 25, 
        fontWeight: "bold", 
        marginBottom: 15, 
        textAlign: "center", 
        color: "#5D576B",
        textDecorationLine: "underline"
    },
    em: {
        color: "#8884FF"
    },
    customCard: {
        flex: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20
    },
    heavyHeader: {
        fontWeight: "bold",
        fontSize: 15
    }
})