import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    headerIcon: {
        maxWidth: 40,
        maxHeight: 40
    },
    container: {
        backgroundColor: "white",
        minHeight: height,
        width,
        zIndex: -1
    },
    mainHeaderText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    headerText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "blue"
    },
    margin: {
        margin: 20
    },
    item: {
        maxWidth: width * 0.80
    },
    marginBottomText: {
        fontSize: 18, 
        marginBottom: 15
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    bottom: {
        position: "absolute",
        bottom: 80,
        margin: 20,
        backgroundColor: "white",
        borderTopColor: "grey",
        borderTopWidth: 2,
        height: 100,
        width: "90%"
    }
})