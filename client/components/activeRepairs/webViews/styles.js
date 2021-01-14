import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container:{
        flex:1
    },
    webViewContainer: {
        width,
        height
    },
    header:{
        padding:30,
        alignItems: 'center',
        minHeight: 250, 
        width
    },
    headerTitle:{
        fontSize:38,
        color:"#FFFFFF",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        minWidth: width * 0.85,
        padding: 15,
        fontWeight: "bold",
        marginTop:30,
        textAlign: 'center'
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    postContent: {
        flex: 1,
        padding:30,
    },
    postTitle:{
        fontSize:26,
        fontWeight:'600',
    },
    postDescription:{
        fontSize:16,
        marginTop:10,
    },
    tags:{
        color: '#00BFFF',
        marginTop:10,
    },
    date:{
        color: '#696969',
        marginTop:10,
    },
    avatar: {
        width: 80,
        height: 80,
        minWidth: 80,
        minHeight: 80,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: "#00BFFF",
    },
    profile:{
        flexDirection: 'row',
        marginTop:20
    },
    name:{
        fontSize:22,
        color:"black",
        fontWeight:'600',
        alignSelf:'center',
        marginLeft:10
    }, 
    shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#8884FF",
    },
    shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
    }
})