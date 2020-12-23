import React, { Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Right, Title, Button, Body, Text as NativeText } from 'native-base';
import Toast from 'react-native-toast-message';
import styles from './styles.js';

const EmergencyContactHomeHelper = (props) => {
    return (
        <Fragment>
            <Header>
                <Left style={{ flexDirection: "row" }}>
                    <Button onPress={() => {
                        props.props.navigation.goBack();
                    }} transparent>
                        <Image source={require("../../../../assets/icons/go-back.png")} style={{ maxWidth: 50, maxHeight: 50 }} />
                    </Button>
                    <Title style={{ paddingTop: 15 }}>Emergency Contact</Title>
                </Left>
            </Header>
            <View style={{ flex: 1, margin: 20 }}>
                <Text style={styles.mainText}>Add at least one emergency contact</Text>
                <Text style={styles.standardText}>An emergency contact gives us another possible way to help out if you're ever in an urgent situation. We suggest you add at least one contact before you start a trip. We'll never share the infor with other people who use our platform.</Text>
                <View style={styles.iconContainer}>
                    <Image source={require("../../../../assets/icons/globe.png")} style={{ maxWidth: 200, maxHeight: 200 }} />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.leftBottom}>
                    <Text style={styles.learnMore}>Learn More</Text>
                </View>
                <Button onPress={() => {

                }} style={styles.footerButton}>
                    <NativeText style={styles.innerText}>Add Now</NativeText>
                </Button>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </Fragment>
    );
}
export default EmergencyContactHomeHelper;