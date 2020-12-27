import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Button, Right, Title, Text as NativeText, List, ListItem } from 'native-base';
import styles from './styles.js';

class PreviewStepsBrokenVehicleListing extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Let's set up your listing</Title>
                    </Left>
                    
                </Header>
                <ScrollView style={styles.container}>
                    <ListItem style={{ minHeight: 75 }}>
                        <Left>
                            <NativeText style={styles.normalFont}>Main Details</NativeText>
                        </Left>
                        
                            <Button onPress={() => {
                                this.props.props.navigation.navigate("create-vehicle-listing-one");
                            }} style={styles.continueButton}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue</NativeText>
                            </Button>
                     
                    </ListItem>
                    <List>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Location</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Details (description of issues)</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Specifications of vehicle</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Photos</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Title</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Booking Settings</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Avaliability</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Pricing</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Review</NativeText>
                            </Left>
                        </ListItem>
                    </List>
                </ScrollView>
            </Fragment>
        )
    }
}
export default PreviewStepsBrokenVehicleListing;