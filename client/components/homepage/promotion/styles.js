import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 10.00,

        elevation: 14
    },
    header: {
        margin: 20
    },
    promoImage: {
        width: width * 0.90,
        maxHeight: 150
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 40
    },  
    title: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold"
    }
})