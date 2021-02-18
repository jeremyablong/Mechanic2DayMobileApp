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
    listItemTwo: {
        minHeight: 35,
        padding: 10
    },
    minWidthSelect: {
        width: width * 0.75
    },
    switchText: {
        marginRight: 25,
        fontSize: 24,
        fontWeight: "bold"
    },
    currentLocationText: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: "bold"
    },
    slideUpContainer: {
        margin: 20
    },
    hr: {
        borderBottomColor: "lightgrey",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 2
    },
    slideUpHeader: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: "center"
    },
    marginAbsolute: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    positionBottom: {
        bottom: 15,
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        right: 0
    },
    iWant: {
        fontSize: 18,
        color: "blue", 
        fontWeight: "bold"
    },
    customCustom: {
        width: width * 0.75,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    map: {
        width,
        height,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    bottomContainer: {
        position: "absolute",
        bottom: 100,
        left: -17
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    overlayyy: {
        position: 'absolute', 
        top: 0, 
        padding: 10,
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    overlayyyCustom: {
        position: 'absolute', 
        top: 0, 
        padding: 10,
        left: 0, 
        right: 0, 
        bottom: 0, 
        margin: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    item: {
        width: width - 70,
        height: width - 125,
    },
    margin15: { 
        marginTop: 15, 
        marginBottom: 15 
    },
    itemCustom: {
        width: width - 70,
        height: width - 55
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        resizeMode: 'cover',
        minWidth: "100%",
        minHeight: "100%"
    },
    imageCustom: {
        resizeMode: "contain",
        width: "100%",
        height: "100%"
    },
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
    background: {
        width,
        height: 300
    },
    topContainer: {
        height: 300, 
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        position: "absolute",
        justifyContent: "center"
    },
    innerContainer: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 25,
        width: width * 0.85,
        height: 225,
        maxHeight: 225,
        borderWidth: 2,
        borderColor: "black",
        top: -275,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24
    },
    mainContent: {
        zIndex: -1,
        minHeight: height,
        width,
        height: "100%",
        backgroundColor: "white"
    },
    mainContain: {
        alignItems: 'center', 
        justifyContent: 'center',
        justifyContent: "center",
        zIndex: -1
    },
    goBackIcon: {
        maxWidth: 30, 
        maxHeight: 30
    },
    columnTenth: {
        width: width * 0.15
    },
    largecolumnTwo: {
        width: width * 0.70,
        marginLeft: 10
    },
    bold: {
        fontWeight: "bold"
    },
    icon: {
        maxWidth: "100%", 
        maxHeight: 40
    },
    row: {
        flexDirection: "row",
        maxHeight: 85
    },
    smallColumn: {
        width: width * 0.35
    },
    largeColumn: {
        width: width * 0.65
    },
    locationText: {
        marginBottom: 20,
        fontSize: 22,
        fontWeight: "bold"
    },
    map: {
        width: "100%", 
        height: 225
    },
    iconImage: {
        maxWidth: 20, 
        maxHeight: 20, 
        marginRight: 10
    },
    profilePic: {
        minWidth: 65,
        maxWidth: 65,
        minHeight: 65,
        maxHeight: 65,
        borderRadius: 35
    },
    greyedOut: {
        color: "grey"
    },
    largeBold: {
        fontSize: 22,
        fontWeight: "bold"
    },
    midSizedText: {
        fontSize: 18
    },
    absolute: {
        position: 'absolute',
        left: 15,
        zIndex: 9999,
        top: 25
    },
    main: {
        margin: 20,
        marginTop: 75
    },
    coName: {
        fontSize: 22,
        fontWeight: "bold", 
        textAlign: "left",
        textDecorationLine: "underline"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    }
});
    