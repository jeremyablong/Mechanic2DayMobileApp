import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 35, 
        maxHeight: 35
    },
    container: {
        height: height - (Platform === "ios" ? 64 : 56),
        width, 
        backgroundColor: "white"
    },
    margin: {
        margin: 20
    },
    header: {
        fontSize: 22, 
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 10
    },
    absoluteOverlay: {
        position: "absolute",
        top: 10,
        left: 0,
        right: 0
    },
    circle: {
        position: "absolute",
        bottom: 50, 
        right: 30,
        backgroundColor: "white",
        height: 85,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },  
    warningText: {
        fontStyle: "italic", 
        fontWeight: "bold", 
        color: "darkred",
        marginTop: 15, 
        textAlign: "center"
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2
    },
    topAndBottomMargin: {
        marginTop: 15,
        marginBottom: 15 
    },
    mapTitle: {
        fontSize: 24, 
        fontWeight: "bold",
        color: "black", 
        textAlign: "center",
        textDecorationLine: "underline"
    },
    map: {
        width: "100%",
        height: height - (Platform === "ios" ? 64 : 56)
    }
})