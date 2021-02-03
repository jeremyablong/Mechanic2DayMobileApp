import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    header: {
        fontWeight: "bold",
        fontSize: 25
    },
    background: {
        flex: 1
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    goBack: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 50
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    backgroundCentered: {
        backgroundColor: "white",
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24
    },
    genderBtnTwo: {
        width: "80%",
        minWidth: "80%",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 2
    },
    genderBtn: {
        width: "80%",
        minWidth: "80%",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2
    },
    containerContent: {
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: "center",
        paddingTop: 100,
        paddingBottom: 100
    }
})