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
    margin: {
        margin: 20
    },
    helperText: {
        fontSize: 24,
        marginTop: 14,
        fontWeight: "bold"
    },
    customEndButton: {
        width: width * 0.75,
        justifyContent: "center",
        marginTop: 40
    },
    horizontalScroll: {
        marginLeft: -15, 
        minHeight: 425, 
        paddingTop: 20, 
        paddingLeft: 20
    },
    boxIcon: {
        maxWidth: 75, 
        maxHeight: 75,
        minWidth: 75,
        minHeight: 75
    },
    customView: {
        minWidth: width * 0.70,
        height: 300,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        shadowColor: "#000",
        borderWidth: 2,
        borderColor: "grey",
        padding: 6,
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        margin: 10
    },
    customViewSelected: {
        minWidth: width * 0.70,
        height: 300,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        shadowColor: "#000",
        borderWidth: 2,
        borderColor: "grey",
        padding: 6,
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        margin: 10
    },
    pickerHeader: {
        fontSize: 18
    },
    picker: {
        width: width * 0.80
    },
    price: {
        fontSize: 40,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "blue"
    },
    midSizeText: {
        fontSize: 18,
        textAlign: "center"
    },
    threeSideMargin: {
        marginLeft: 20, 
        marginRight: 20
    },
    textMain: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#8884FF",
        textAlign: "center",
        textDecorationLine: "underline"
    }
})