import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        height,
        width
    },
    container: {
        flex: 1,
        marginTop: 200
    },
    textInputContainer: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
    },
    poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
    },
    listItemTwo: {
      minHeight: 40,
      marginTop: 10,
      backgroundColor: "white",
      paddingTop: 5
    },
    textBox: {
      padding: 20,
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    image: {
      maxWidth: 175,
      maxHeight: 175
    },
    goBack: {
      fontSize: 22,
      fontWeight: "bold",
      color: "white",
      textAlign: "center"
    },
    imgContainer: {
      marginBottom: 0,
      marginTop: -100,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    },
    submitBtn: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "white",
      width,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    },
    bottom: {
      justifyContent: "center", 
      alignItems: "center",
      position: "absolute", 
      bottom: 0,
      margin: 20,
      flex: 1
    },
    btnContainer: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      marginBottom: 40,
      width: width - 40
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
      textAlign: "center"
    },
    powered: {},
    listView: {},
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    }
})