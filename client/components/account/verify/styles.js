import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        zIndex: -1
    },
    headerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    margin: {
        margin: 20
    },
    textOne: {
        fontSize: 18
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 15,
        marginBottom: 15
    },
    stripe: {
        maxHeight: 200,
        width: width - 40
    },
    webview: {
        width: width - 40,
        maxWidth: width - 40,
        minWidth: width - 40,
        height: height - (Platform.OS === "ios" ? 150 : 80),
        minHeight: height - (Platform.OS === "ios" ? 150 : 80)
    },
    containerStyle: {
        width: width - 40,
        maxWidth: width - 40,
        minWidth: width - 40,
        height: height - (Platform.OS === "ios" ? 150 : 80),
        minHeight: height - (Platform.OS === "ios" ? 150 : 80)
    }
})