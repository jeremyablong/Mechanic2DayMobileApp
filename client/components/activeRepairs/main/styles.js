import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container:{
        flex:1,
        backgroundColor: "white"
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#E6E6E6"
    },
    listContainer:{
       alignItems:'center',
       flex: 1
    },
      /******** card **************/
    card:{
        backgroundColor:"white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage:{
        height: 120,
        width: 120,
        borderRadius:60,
        alignSelf:'center',
        borderColor:"#DCDCDC",
        borderWidth:3,
    },
    background: {
        backgroundColor: "white"
    },
    name:{
        fontSize: 24,
        flex:1,
        alignSelf:'center',
        color:"blue",
        fontWeight:'bold',
        textDecorationLine: "underline"
    },
    position:{
        fontSize:20,
        flex:1,
        fontWeight:'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf:'center',
        color:"black"
    },
    followButton: {
        marginTop:10,
        height:35,
        width: width * 0.80,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        alignItems: 'center',
        backgroundColor: "#8884FF"
    },
    followButtonText:{
        color: "white",
        fontWeight: "bold",
        fontSize:20,
    },
    icon:{
        marginTop: -10,
        height: 35,
        width: 35, 
    }
})