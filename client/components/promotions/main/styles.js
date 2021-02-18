import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height: "100%",
        width,
        backgroundColor: "white",
        zIndex: -1,
        flex: 1
    },
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#E6E6E6",
    },
    skelBox: {
        height: 200, 
        width: "100%",
        minHeight: 200,
        minWidth: width * 0.95,
        marginTop: 15,
        marginBottom: 15
    },
    listContainer:{
       alignItems:'center'
    },
      /******** card **************/
    card:{
        shadowColor: '#00000021',
        borderWidth: 2,
        borderColor: "black",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        width: 200,
        maxHeight: 325,
        marginVertical: 5,
        backgroundColor:"white",
        flexBasis: '46%',
        marginHorizontal: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
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
    name:{
        fontSize:18,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
    },
    position:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf:'center',
        color: "black"
    },
    followButton: {
        marginTop:10,
        height:35,
        width:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
    followButtonText:{
        color: "#FFFFFF",
        fontSize:20,
    },
    icon:{
        height: 20,
        width: 20, 
    }
});
    