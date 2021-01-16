import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container:{
        flex: 1
    },
    margin: {
        margin: 20
    },
    paypalIcon: {
        maxWidth: 80,
        maxHeight: 80
    },
    midSized: {
        fontSize: 18
    },
    payment: {
        color: "blue",
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    paymentOutter: {
        fontSize: 30
    },
    midSizedCustomRed: {
        color: "#5D576B", 
        fontWeight: "bold", 
        marginTop: 15,
        fontSize: 34,
        textDecorationLine: "underline"
    },
    midSizedCustom: {
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20
    },  
    orderDetailsTitle: {
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    hr: {
        marginTop: 20, 
        marginBottom: 20, 
        borderBottomWidth: 1, 
        borderBottomColor: "grey"
    }
})