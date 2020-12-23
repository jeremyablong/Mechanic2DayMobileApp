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
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        backgroundColor: "white",
        paddingTop: 25,
        paddingBottom: 20,
        width
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
    goBack: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10
    },
    buttonText: {
        color: 'white',
    },
    textMain: {
        fontSize: 20,
        padding: 20,
        color: "black",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    messageInput: {
        paddingLeft: 15
    }
})