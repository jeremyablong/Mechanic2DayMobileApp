import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container:{
        flex:1,
        backgroundColor: "white"
    },
    desc: {
        fontSize: 14
    },
    biggerText: {
        fontSize: 18
    },
    initiatePaymentBtn: {
        width: width * 0.90,
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    mainPaymentText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "blue",
        marginBottom: 10
    },      
    bottomButton: {
        position: "absolute",
        bottom: 10,
        margin: 20
    },
    paymentButton: {
        top: -100, 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    centered: {
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center"
    },
    descHeader: {
        fontSize: 20, 
        fontWeight: "bold", 
        color: "blue",
        alignSelf: "stretch",
        marginBottom: 8
    },
    map: {
        minWidth: width,
        minHeight: 250, 
        position: "absolute",
        top: -20
    },
    gallery: {
        flex: 1,
        minHeight: 250, 
        maxHeight: 250, 
        minWidth: width,
        backgroundColor: 'black',
        position: "absolute"
    },
    agreedContainer: {
        top: -90,
        justifyContent: "center",
        alignItems: "center",
        margin: 30,
        alignContent: "center"
    },  
    marginSpacer: {
        margin: 20
    },
    textText: {
        fontSize: 18, 
        textAlign: "center", 
        marginTop: 20,
        alignSelf: "stretch",
        textAlign: "left"
    },
    hostedText: {
        fontSize: 24
    },  
    adjustMargin: {
        margin: 20,
        borderTopColor: "lightgrey", 
        borderTopWidth: 1,
        paddingTop: 20,
        borderBottomColor: "lightgrey", 
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    columnCustom: {
        flexDirection: "column",
        width: width * 0.75
    },
    acceptPaymentBtn: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.75
    },
    acceptPaymentBtnTwo: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: width * 0.75,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 40
    },
    payerText: {
        fontSize: 30,
        color: "darkblue",
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "bold"
    },
    columnCustomSmaller: {
        flexDirection: "column",
        width: width * 0.25
    },
    iconLarger: {
        maxWidth: 50,
        minWidth: 50,
        minHeight: 50,
        maxHeight: 50,
        borderRadius: 45
    },
    adjustMarginCustom: {
        margin: 20,
        flexDirection: "row",
        maxHeight: 50
    },
    list: {
        top: -30
    },
    agreed: {
        fontSize: 30, 
        fontWeight: "bold", 
        textDecorationLine: "underline", 
        color: "black",
        alignSelf: "stretch",
        textAlign: "left"
    },
    galleryContainer: {
        minHeight: 250
    },
    hr: {
        borderBottomColor: "lightgrey", 
        borderBottomWidth: 1
    },  
    header: {
        fontSize: 24, 
        fontWeight: "bold"
    },
    column: {
        width: width * 0.33,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    rightColumn: {
        width: width * 0.33,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    iconIcon: {
        maxWidth: 40, 
        maxHeight: 40
    }
})