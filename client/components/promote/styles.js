import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height: "100%",
        width,
        backgroundColor: "white",
        zIndex: -1
    },
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    box: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15
    },
    boxPlaceholder: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        minHeight: 175,
        maxHeight: 175
    },
    hr: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    mainText: {
        fontSize: 18, 
        fontWeight: "bold", 
        textAlign: "center"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    circle: {
        maxWidth: 80, 
        maxHeight: 80, 
        borderRadius: 45,
        borderWidth: 2,
        backgroundColor: "white"
    },
    priceText: {
        textAlign: "center",
        marginTop: 25,
        color: "darkblue",
        fontWeight: "bold",
        fontSize: 18
    },
    boostText: {
        textAlign: "center",
        color: "blue", 
        fontWeight: "bold",
        fontSize: 22
    },
    column: {
        flexDirection: "column",
        width: "33.333333%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 25,
        borderWidth: 2,
        padding: 5,
        margin: 2,
        height: 150
    },
    columnTwo: {
        flexDirection: "column",
        width: "33.333333%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 25,
        padding: 5,
        margin: 6,
        height: 150,
        width: width * 0.30
    },
    columnThree: {
        flexDirection: "column",
        width: "33.333333%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: 5,
        margin: 6,
        width: width * 0.30
    },
    noAccessText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        marginLeft: -15,
        marginTop: 20
    },
    middleText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    },
    middleSmallerText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
});
    