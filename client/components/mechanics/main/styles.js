import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {    
        height: "100%",
        width,
        backgroundColor: "white",
        flex: 1
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    center: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor:"#E6E6E6",
        flex: 1
      },
      listContainer:{
       alignItems:'center'
      },
      /******** card **************/
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        height: "100%",
        marginVertical: 5,
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
      star: {
          maxWidth: 25, 
          maxHeight: 25
      },
      starText: {
          fontSize: 16, 
          fontWeight: "bold"
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
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
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
      },
      position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        textAlign: 'center',
        color:"#696969"
      },
      followButton: {
        marginTop:10,
        height:35,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "black",
        alignItems: 'center',
        borderRadius:10,
        backgroundColor: "#8884FF",
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
    