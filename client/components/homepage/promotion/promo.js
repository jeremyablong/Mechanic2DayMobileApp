import React,  { Fragment } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles.js";

const PromotionWide = (props) => {
    return (
        <Fragment>
            <View style={styles.header}>
                <Text style={styles.title}>Promotions</Text>
                <Text>What's the worst that could happen?!</Text>
            </View>
            <View style={styles.container}>
                <Image source={require("../../../assets/images/promotion.jpg")} style={styles.promoImage} />
            </View>
            <View style={styles.hr} />
        </Fragment>
    );
}
export default PromotionWide;