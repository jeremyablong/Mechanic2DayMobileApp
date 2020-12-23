import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    innerContainer: {
        width: width * 0.45,
        height: 250,
        backgroundColor: "white",
        margin: 15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 10.68,

        elevation: 11,
        borderRadius: 25
    },
    mainTextTwo: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    innerBox: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
        borderRadius: 20
    },
    innerContainerTwo: {
        height: 200,
        minHeight: 200,
        width: 300,
        padding: 10,
        margin: 10,
        marginLeft: 50,
        flex: 1,
        zIndex: 99999
    },
    outterContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1
    },
    scrollView: {
        maxHeight: 325
    },
    scrollViewTwo: {
        flex: 1,
        zIndex: 999,
        top: -150
    },
    contentContainerTwo: {
       
    },
    boxOne: {
        backgroundColor: "black",
        width: width * 0.85,
        height: height * 0.55,
        flex: 1
    },
    middleContent: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 12
    },
    firstText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    secondText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    container: {
        marginTop: 50,
        flex: 1
    },
    mainText: {
        fontSize: 20,
        textAlign: "left",
        paddingLeft: 20,
        paddingRight: 20, 
        marginTop: 40,
        paddingBottom: 8,
        fontWeight: "bold",
        color: "white"
    },
    clientsText: {
        fontSize: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        color: "white"
    }
})