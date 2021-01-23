import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        height: height - (Platform === "ios" ? 64 : 56),
        width, 
        backgroundColor: "white"
    },
    customMapButton: {
        width: width,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "grey"
    },
    bottomBottom: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        left: 0,
        right: 0,
        position: "absolute",
        bottom: 50
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    modalContent: {
        flex: 1, 
        maxHeight: 360, 
        backgroundColor: "white", 
        padding: 25, 
        justifyContent: "center",
        alignItems: "center", 
        alignContent: "center"
    },
    headerMain: {
        fontSize: 18, 
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15
    },
    absolutelyCentered: {
        marginTop: 15
    },
    marginAbsolute: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        position: "absolute",
        top: 10,
        left: 0,
        right: 0
    },
    margin: {
        margin: 20
    },
    map: {
        width,
        height: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})