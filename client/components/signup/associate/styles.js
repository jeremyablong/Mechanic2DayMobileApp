import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    backBackground: {
        paddingTop: 100,
        backgroundColor: "white",
        height: height * 0.60,
        width,
        padding: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    bottom: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        bottom: 10,
        left: 0,
        right: 0,
        zIndex: -1
    },
    goBack: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    mainText: {
        fontSize: 22,
        textAlign: "center"
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    listItemTwo: {
        backgroundColor: "white",
        paddingTop: 5,
        minHeight: 50
    },
    inputContainer: {
        width: width * 0.90,
        marginTop: 15
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});
           