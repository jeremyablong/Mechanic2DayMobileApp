import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    background: {
        width,
        height: 300
    },
    topContainer: {
        height: 300, 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    innerContainer: {
        backgroundColor: "white",
        borderRadius: 25,
        width: width * 0.85,
        height: "100%",
        maxHeight: 250,
        top: -100,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        zIndex: 999,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24
    },
    rowCarousel: {
        flexDirection: "row"
    },
    lowerText: {
        textAlign: "center",
        fontSize: 16
    },
    desc: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        marginBottom: 15
    },
    headerOne: {
        fontSize: 30,
        color: "white", 
        fontWeight: "bold",
        marginLeft: 20
    },
    midSection: {
        marginBottom: 50,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    slideshowBtn: {
        borderWidth: 2,
        borderColor: "black",
        marginLeft: 20,
        backgroundColor: "white"
    },
    bottomView: {
        position: "absolute",
        bottom: 20
    },
    containerStyle: {
        height: "100%",
        paddingBottom: 300
    },
    specialImage: {
        width: width * 0.45,
        height: 150,
        padding: 20,
        borderRadius: 15
    },
    backgroundSlider: {
        minHeight: 350,
        width: width * 0.65
    },
    flatListMain: {
        minHeight: 750,
        minWidth: width,
        flex: 1
    },
    specialRow: {
        flexDirection: "row",
        flex: 1
    },
    floatLeft: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 6,
        marginBottom: 6
    },
    mainTitle: {
        marginLeft: 15,
        justifyContent: 'flex-start',
        flex: 1,
        fontWeight: "bold",
        fontSize: 15
    },
    flatlistTitle: {
        fontSize: 20,
        textAlign: "left",
        fontWeight: "bold",
        paddingBottom: 5,
        paddingLeft: 15
    },
    pricePrice: {
        marginLeft: 15,
        justifyContent: 'flex-start',
        marginBottom: 10,
        flex: 1,
        fontWeight: "bold",
        fontSize: 20,
        color: "black"
    },
    left: {
        paddingTop: 14,
        marginLeft: 15,
        marginBottom: 4,
        justifyContent: 'flex-start',
        flexDirection: "row",
        flex: 1
    },
    containerPanel: {
        flex: 1,
        minHeight: height,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slideUpRow: {
        flexDirection: "row",
        margin: 20
    },
    backButtonIcon: {
        width: 30,
        height: 30,
        marginTop: 15,
        marginRight: 10
    },
    customInput: {
        width: width * 0.75
    },
    whiteBackground: {
        backgroundColor: "white",
        height
    },
    flatlistItem: {
        minWidth: width * 0.50,
        minHeight: 200,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flex: 1
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 40
    },
    ratingText: {
        fontSize: 20,
        paddingBottom: 15
    },
    mainContain: {
        height: "100%",
        alignItems: "center"
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    customButtonFive: {
        width: width * 0.75,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "black"
    },
    btnBtn: {
        minWidth: "80%",
        justifyContent: "center",
        marginTop: 20
    },
    centerContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    descriptionSmaller: {
        fontSize: 15,
        paddingLeft: 20,
        paddingBottom: 20
    },
    mainContent: {
        top: 225,
        flex: 1
    },
    repairText: {
        fontSize: 20,
        textAlign: "left",
        paddingLeft: 20, 
        paddingBottom: 8,
        fontWeight: "bold"
    },
    inputOne: {
        minWidth: "90%",
        position: "absolute",
        top: 10,
        backgroundColor: "white",
        borderRadius: 10,
        paddingLeft: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    row: {
        flexDirection: "row",
        top: -20
    },
    rowLower: {
        flexDirection: "row",
        top: -70
    },
    icon: {
        maxWidth: 40,
        maxHeight: 40,
        margin: 10,
        tintColor: "#001514"
    },
    secondContainer: {
        top: 100
    }
})