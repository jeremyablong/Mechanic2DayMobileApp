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
    listItemTwo: {
        minHeight: 35,
        padding: 10
    },
    minWidthSelect: {
        width: width * 0.75
    },
    switchText: {
        marginRight: 25,
        fontSize: 24,
        fontWeight: "bold"
    },
    currentLocationText: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: "bold"
    },
    slideUpContainer: {
        margin: 20
    },
    hr: {
        borderBottomColor: "lightgrey",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 2
    },
    slideUpHeader: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: "center"
    },
    marginAbsolute: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    positionBottom: {
        bottom: 15,
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        right: 0
    },
    iWant: {
        fontSize: 18,
        color: "blue", 
        fontWeight: "bold"
    },
    customCustom: {
        width: width * 0.75,
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
        padding: 10,
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    overlayyyCustom: {
        position: 'absolute', 
        top: 0, 
        padding: 10,
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    item: {
        width: width - 70,
        height: width - 125,
    },
    margin15: { 
        marginTop: 15, 
        marginBottom: 15 
    },
    itemCustom: {
        width: width - 70,
        height: width - 55
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
    },
    imageCustom: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    }
})