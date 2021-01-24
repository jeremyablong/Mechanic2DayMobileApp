import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    headerIconTwo: {
        maxWidth: 75, 
        maxHeight: 75
    },
    itemItem: {
        marginBottom: 20
    },  
    absolutePosition: {
        position: "absolute",
        bottom: 30, 
        left: 10
    },
    marginCentered: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        alignContent: "center"
    },
    headerIconThree: {
        maxWidth: 60, 
        maxHeight: 60
    },
    hr: {
        marginTop: 15, 
        marginBottom: 15, 
        borderBottomColor: "grey", 
        borderBottomWidth: 2
    },
    textInput: {
        borderWidth: 2, 
        borderColor: "grey",
        minWidth: width * 0.90
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    labelTwo: {
        fontSize: 18,
        fontWeight: "bold"
    },
    maximum: {
        maxWidth: 25,
        maxHeight: 25
    },
    margin: {
        margin: 20
    },
    listitem: {
        width: width,
        marginTop: 10
    },
    container: {
        minHeight: height - (Platform === "ios" ? 64 : 58),
        width, 
        backgroundColor: "white"
    },
    absolutelyTopRight: {
        position: "absolute",
        top: 0,
        right: 15
    },
    absolutelyBottomRight: {
        right: 15,
        bottom: 15,
        position: "absolute"
    },
    absolutelyTopLeft: {
        left: 15,
        top: 15,
        position: "absolute"
    },
    row: {
        flexDirection: "row",
        paddingTop: 20
    },
    customText: {
        fontSize: 18,
        color: "darkblue",
        fontWeight: "bold",
        textAlign: "center"
    },
    columnThird: {
        flexDirection: "column",
        width: width * 0.33333333,
        justifyContent: "center",
        minHeight: 100,
        minWidth: width * 0.33333333,
        padding: 5,
        borderColor: "lightgrey",
        borderWidth: 2,
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white",
        borderRadius: 10
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    map: {
        height: height * 0.87,
        width
    },
    header:{
        padding:30,
        alignItems: 'center',
        backgroundColor: "darkblue",
    },
    atTheBottom: {
        bottom: 55,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        left: 0,
        right: 0
    },
    headerTitle:{
        fontSize:30,
        color:"#FFFFFF",
        marginTop:10,
        textAlign: "center",
        fontWeight: "bold"
    },
    name:{
        fontSize:22,
        color:"darkblue",
        fontWeight:'600',
        marginLeft: 15
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
        borderRadius: 35,
        borderWidth: 4,
        borderColor: "#00BFFF",
    },
    profile:{
        flexDirection: 'row',
        marginTop:20
    },
    shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "darkblue",
    },
    shareButtonText:{
        color: "white",
        fontSize:20,
    }
})