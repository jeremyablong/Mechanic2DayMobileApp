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
  backgroundBack: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    width: width * 0.85,
    height: height * 0.90
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    bottom: 0
  },
  goBack: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 0,
    paddingBottom: 40
  },
  birthdayTextDisplay: {
    fontSize: 15,
    marginTop: -15,
    fontWeight: "bold",
    color: "black"
  },
  center: {
      justifyContent: "center",
  },
  specialBtn: {
    minWidth: "90%",
    justifyContent: "center"
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: 25
  },
  headerTwo: {
    padding: 30,
    textAlign: "center"
  },
  headerOne: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25
  },
  cakeIcon: {
    maxHeight: 150,
    maxWidth: 150
  }
});
           