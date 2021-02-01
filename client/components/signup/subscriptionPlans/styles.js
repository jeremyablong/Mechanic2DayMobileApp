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
    center: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    formContent:{
        flexDirection: 'row',
        marginTop:30,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:45,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        margin:10,
    },
    icon:{
        width:30,
        height:30,
    },
    iconBtnSearch:{
        alignSelf:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        marginLeft:15,
        justifyContent: 'center'
    },
    notificationList:{
        marginTop:20,
        padding:10,
    },
    card: {
        height:null,
        paddingTop:10,
        paddingBottom:10,
        marginTop:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth:40,
        marginBottom:20,
    },
    cardContent:{
        flexDirection:'row',
        marginLeft:10, 
    },
    price: {
        textAlign: "center",
        fontWeight: "bold",
        color: "darkblue",
        fontSize: 24,
        textDecorationLine: "underline"
    },
    imageContent:{
        marginTop:-40,
    },
    tagsContent:{
        marginTop:10,
        flexWrap:'wrap'
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
    },
    italizedRed: {
        fontStyle: "italic",
        color: "blue"
    },
    scrollView: {
        backgroundColor: "white"
    },
    hrCustom: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 25,
        marginBottom: 25
    },
    margin: {
        margin: 20,
        marginTop: 40
    },
    titleMain: {
        fontSize: 18, 
        fontWeight: "bold"
    },
    name:{
        fontSize:24,
        fontWeight: 'bold',
        marginLeft:10,
        alignSelf: 'center'
    },
    btnColor: {
        padding:10,
        borderRadius:40,
        marginHorizontal:3,
        backgroundColor: "#8884FF",
        marginTop:5,
    }
});
           