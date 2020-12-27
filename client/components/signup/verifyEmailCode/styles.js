import React from "react";
import { StyleSheet, Dimensions } from "react-native";


const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    logo:{
        width:120,
        height:120,
        justifyContent: 'center',
        marginBottom:20,
    },
    outterContainer: {
        shadowColor: "black",
        width,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        backgroundColor: "white"
    },
    inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center',
          shadowColor: "black",
          shadowOffset: {
              width: 0,
              height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          
          elevation: 12,
    },
    inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
    },
    sendButton: {
        backgroundColor: "black",
        minWidth: "50%",
        borderColor: "white",
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
    },
    textMain: {
        fontSize: 20,
        padding: 5,
        color: "black",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    messageInput: {
        paddingLeft: 15
    },
    root: {
        padding: 20,
        marginBottom: 50
    },
    title: {
        textAlign: 'center', fontSize: 30
    },
    centerMe: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    codeFieldRoot: {
        marginTop: 20,
        padding: 10
    },
    cell: {
        width: 40,
        margin: 3,
        height: 40,
        lineHeight: 38,
        fontSize: 30,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    }
})