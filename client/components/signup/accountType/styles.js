import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    accountImage: {
        maxWidth: 125,
        minWidth: 125, 
        minHeight: 125,
        maxHeight: 125
    },
    backBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        backgroundColor: "white",
        height: height * 0.75,
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
        bottom: 10
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
    submitBtn: {
        minWidth: "100%",
        justifyContent: "center",
        marginTop: 20
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});
           