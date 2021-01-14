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
    marginAbsolute: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    map: {
        width,
        height,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    bottomContainer: {
        position: "absolute",
        bottom: 100,
        left: -17
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    overlayyy: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.25)"
    },
    item: {
        width: width - 70,
        height: width - 175,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        resizeMode: 'cover',
        minWidth: "100%",
        minHeight: "100%"
    }
})