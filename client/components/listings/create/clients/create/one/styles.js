import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        minHeight: height,
        width,
        backgroundColor: "white"
    },
    icon: {
        maxWidth: 35,
        maxHeight: 35
    },
    iconSmaller: {
        maxWidth: 25,
        maxHeight: 25
    },
    absoluteIconContainer: {
        position: "absolute",
        left: 15,
        top: 20
    },
    absoluteIcon: {
        maxWidth: 55, 
        maxHeight: 55,
        tintColor: "white"
    },
    innerText: {
        fontSize: 30, 
        color: "white", 
        position: "absolute", 
        bottom: 30, 
        left: 20, 
        right: 20, 
        fontWeight: "bold" 
    },
    centerText: {
        flex: 1,
        fontSize: 20,
        position: "absolute",
        top: 20,
        fontWeight: "bold",
        paddingTop: 14,
        paddingBottom: 20,
        marginLeft: 50
    },
    buttonTouchable: {
        backgroundColor: "black",
        borderWidth: 1,
        minWidth: 250,
        minHeight: 50,
        borderColor: "white",
        paddingTop: 10,
        paddingBottom: 10, 
        paddingLeft: 15,
        paddingRight: 15
    },
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        paddingTop: 20,
        minHeight: 100,
        width
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5
    },
    topView: {
        width,
        minHeight: 85
    },
    containerStyleScanner: {

    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    olderOrNewText: {
        marginTop: 5, 
        fontSize: 18, 
        marginRight: 40
    },
    maxWidthRow: {
        maxWidth: width * 0.80,
        marginTop: 25,
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
        margin: 20
    },
    continueButton: {
        justifyContent: "center",
        minWidth: 250,
        backgroundColor: "#6441A4"
    },
    greyButton: {
        backgroundColor: "lightgrey",
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.90,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    greenButton: {
        borderWidth: 2,
        borderColor: "black",
        width: width * 0.90,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    itemItemTwo: {
        width: width * 0.90,
        minWidth: width * 0.90,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 14,
        minHeight: 50,
        borderWidth: 2,
        borderColor: "#6441A4"
    },  
    minWidthItem: {
        width: width * 0.90,
        minWidth: width * 0.90
    },
    minWidthListItem: {
        minWidth: width * 0.80
    },
    modalContent: {
        minWidth: width * 0.85,
        minHeight: height * 0.60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    submitBtnContinue: {
        minWidth: width * 0.90,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6441A4",
        alignContent: "center"
    },
    pickerPicker: {
        width: width * 0.90,
        minWidth: width * 0.90,
        minHeight: 60
    },
    submitBtnContainerView: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    bordered: {
        borderColor: "lightgrey",
        borderWidth: 1,
        padding: 15,
        marginTop: 15
    },
    bottomPosition: {
        position: "absolute",
        bottom: 15
    },
    justify: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1
    },
    containerSlideUp: {
        minHeight: height,
        height,
        width,
        backgroundColor: "white"
    }
});
    