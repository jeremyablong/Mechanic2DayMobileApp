import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import styles from "./styles.js";


class HomepageInfoHelper extends Component {
    render() {
        return (
            <Fragment>
                <View styles={styles.container}>
                    <View style={[styles.innerContainer, { marginTop: 25 }]}>
                        <Image source={require("../../../assets/icons/support-two.png")} style={{ maxWidth: 50, maxHeight: 50, tintColor: "blue" }} />
                        <Text style={styles.bigger}>24/7 Customer Support</Text>
                        <Text style={styles.smaller}>Rest easy knowing that everyone in the Mechanic2Day community is screened, and 24/7 customer support and roadside assistance are just a click away.</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.innerContainer}>
                        <Image source={require("../../../assets/icons/boxing.png")} style={{ maxWidth: 50, maxHeight: 50 }} />
                        <Text style={[styles.bigger, { color: "blue" }]}>Endless Options</Text>
                        <Text style={styles.smaller}>Choose from hundreds of mechanics you find anywhere else. Have them come to you or go to them - totally up to you.</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={[styles.innerContainer, { marginBottom: 100 }]}>
                        <Image source={require("../../../assets/icons/shield.png")} style={{ maxWidth: 50, maxHeight: 50, tintColor: "blue" }} />
                        <Text style={styles.bigger}>Choose The Right Fit</Text>
                        <Text style={styles.smaller}>Get a tow/roadside assitance from the click of a button! Tow drivers send YOU applications and YOU choose the right fit.</Text>
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default HomepageInfoHelper;