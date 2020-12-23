import React, { Component, Fragment } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, ListItem } from 'native-base';
import styles from './styles.js';

class CreditsHomepageHelper extends Component {
constructor(props) {
    super(props);


}
    render() {
        return (
           <Fragment>
                <View style={styles.container}>
                    <Header>
                        <Left style={{ flexDirection: "row" }}>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                            <Title style={{ paddingTop: 10 }}>Credits & Coupons</Title>
                        </Left>
                    </Header>
                    <View style={styles.centered}>
                        <View style={styles.middle}>
                            <Button style={styles.customBtn}>
                                <NativeText style={styles.nativeTextInner}>Redeem a coupon </NativeText>
                                <Image source={require("../../../../assets/icons/plus.png")} style={styles.plus} />
                            </Button>
                            <ListItem onPress={() => {
                                
                            }} button={true} style={styles.listItem} icon>
                                <Left style={{ flexDirection: "row" }}>
                                    
                                    <NativeText style={{ marginLeft: 20, color: "darkblue" }}>Invite friends for more credit</NativeText>
                                </Left>
                            </ListItem>
                        </View>
                    </View>
                </View>
           </Fragment>
        )
    }
}
export default CreditsHomepageHelper;