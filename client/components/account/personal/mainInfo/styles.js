import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    bigText: {
        fontSize: 30,
        fontWeight: "bold",
        margin: 20
    },
    upperText: {
        margin: 20
    },
    stackedContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 50
    },
    picker: {
        width: width * 0.85,
        minWidth: width * 0.85,
        minHeight: 100,
        height: 100,
        flex: 1
    },
    pickerContainer: {
        marginBottom: 75
    },
    phoneNumberText: {
        margin: 15,
        fontSize: 20
    },
    phoneNumberButton: {
        padding: 20,
        margin: 15
    },
    slideUpContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"
    },
    slideUpOne: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    greyButton: {
        backgroundColor: "lightgrey",
        borderWidth: 2,
        borderColor: "grey",
        width: width * 0.75,
        justifyContent: "center",
        alignItems: "center"
    },
    blackButton: {
        backgroundColor: "black",
        borderWidth: 2,
        borderColor: "grey",
        width: width * 0.75,
        justifyContent: "center",
        alignItems: "center"
    },
    blackButtonText: {
        color: "white"
    },
    greyButtonText: {
        color: "white"
    },
    root: {
        flex: 1, padding: 20
    },
    title: {
        textAlign: 'center', fontSize: 30
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: 'darkblue',
        textAlign: 'center',
    },
    lockIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    focusCell: {
        borderColor: '#000',
    },
    locker: {
        maxWidth: 150,
        maxHeight: 150
    },
    nativeTextCustom: {
        color: "white",
        fontWeight: "bold"
    },
    viewContainer: {
        flex: 1, 
        padding: 20,
        marginTop: 40,
        alignItems: "center"
    },
    submitButton: {
        width: width * 0.85,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
})