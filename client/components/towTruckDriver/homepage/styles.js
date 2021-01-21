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
    list: {
        //paddingHorizontal: 5,
        backgroundColor:"#E6E6E6"
    },
    listContainer: {
        paddingBottom: 75
    },
      /******** card **************/
    card:{
        width: width,
        height:150,
        flexDirection:'row',
        padding:20,
    
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    cardImage:{
        height: 70,
        width: 70,
    },
    title:{
        fontSize:28,
        flex:1,
        color: "black",
        fontWeight:'bold',
        marginLeft:40
    },
    subTitle:{
        fontSize:12,
        flex:1,
        color:"#FFFFFF",
    },
    icon:{
        height: 20,
        width: 20, 
    }
})