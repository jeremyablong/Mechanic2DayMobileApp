import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    mapCustom: {
        width,
        flex: 1,
        height
    },
    container: {    
        height: "100%",
        width,
        backgroundColor: "white"
    },
    bottomContainer: {
        position: "absolute",
        bottom: 25
    },
    justifyCentered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        position: "absolute",
        top: 10
    },
    topContainer: {
        minHeight: 75,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    nextContainer: {
        margin: 20
    },
    biggerP: {
        fontSize: 18
    },
    p: {
        fontSize: 14
    },
    rowCustom: {
        flexDirection: "row",
        margin: 10
    },
    listingItem: {
        maxWidth: width * 0.75,
        marginRight: 30
    },
    horizontalScroller: {
        marginTop: 30
    },
    label: {
        backgroundColor: "white",
        position: "absolute",
        padding: 5,
        margin: 20
    },
    wideImage: {
        minWidth: width * 0.70,
        minHeight: height * 0.22,
        maxWidth: width * 0.70,
        maxHeight:  height * 0.22
    },
    h3: {
        textAlign: "left",
        fontSize: 22,
        fontWeight: "bold"
    },
    topper: {
        position: "absolute",
        top: 35, 
        left: 0, 
        right: 0,  
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24
    },
    specialText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "grey"
    },
    listItemTwo: {
        minHeight: 45,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    searchbarContainer: {
        marginTop: 35
    },
    innerText: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 15
    },
    circledView: {
        minWidth: width * 0.80,
        width: width * 0.80,
        borderRadius: 40,
        backgroundColor: "white",
        flex: 1,
        minHeight: "100%",
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: "row"
    }
});
    