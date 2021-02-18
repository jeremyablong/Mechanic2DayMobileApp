import React,  { Fragment } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles.js";

const PromotionWide = (props) => {
    return (
        <Fragment>
            <View style={styles.header}>
                <Text style={styles.title}>Promotions</Text>
                <Text>What's the worst that could happen?!</Text>
            </View>
            <TouchableOpacity onPress={() => {
                props.props.navigation.push("promotions-homepage-main");
            }} style={styles.container}>
                <Image source={require("../../../assets/images/promotion.jpg")} style={styles.promoImage} />
            </TouchableOpacity>
            <View style={styles.hr} />
        </Fragment>
    );
}
export default PromotionWide;