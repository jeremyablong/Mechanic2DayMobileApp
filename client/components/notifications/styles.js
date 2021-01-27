import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height: "100%",
        width,
        backgroundColor: "white"
    },
    leftAction: {
        minWidth: width * 0.35,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    centerAll: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    actionText: {
        textAlign: 'center'
    },  
    topLeftCorner: {
        position: "absolute",
        top: 10,
        left: 10
    },  
    bottomLeft: {
        position: "absolute",
        left: 10,
        bottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        marginBottom: 14,
        textDecorationLine: "underline"
    },
    desc: {
        fontSize: 18,
        textAlign: 'center'
    },
    center: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
});
    