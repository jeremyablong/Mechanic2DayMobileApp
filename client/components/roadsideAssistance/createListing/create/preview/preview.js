import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Body, Button, Right, Title, Subtitle, ListItem, List, Text as NativeText } from 'native-base';
import styles from './styles.js';

class PreviewRoadsideAssistanceHelper extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: -80 }}>
                        <Title>Preview Steps</Title>
                        <Subtitle>Complete the following steps to list your Co.</Subtitle>
                    </Body>
                </Header>
                <ScrollView style={styles.container}>
                    <List>
                        <ListItem style={{ minHeight: 75 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Location</NativeText>
                            </Left>
                            
                            <View style={styles.rightRight}>
                                <Button onPress={() => {
                                    this.props.props.navigation.push("advertise-create-address");
                                }} style={styles.continueButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue</NativeText>
                                </Button>
                            </View>
                        
                        </ListItem>
                    </List>
                    <List>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Details (Driver's License Info)</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Insurance Information</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>General Details (Company details)</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Pricing</NativeText>
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
export default PreviewRoadsideAssistanceHelper;