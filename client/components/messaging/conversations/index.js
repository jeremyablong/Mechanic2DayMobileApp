import React, { Component, Fragment } from 'react';
import styles from "./styles.js";
import { View, Text, Image, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, List, ListItem, Thumbnail } from 'native-base';
import { Config } from "react-native-config";
import axios from "axios";
import { connect } from "react-redux";
import { TabView, SceneMap } from 'react-native-tab-view';

   
const initialLayout = { width: Dimensions.get('window').width };


class MessagingConversationsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        channels: [],
        routes: [
            { key: 'individual', title: 'Individual Messages' },
            { key: 'group', title: 'Group Messages' },
        ],
        index: 0
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/conversations/sendbird`).then((res) => {
            if (res.data) {
                console.log(res.data);

                const { channels } = res.data;

                this.setState({
                    channels
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderScene = ({ route }) => {
        const { channels } = this.state;

        switch (route.key) {
          case 'individual':
            return (
                <View style={{ margin: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Individual Messages</Text>
                </View>
            );
          case 'group':
            return (
                <View>
                    <List>
                        {typeof channels !== "undefined" && channels.length > 0 ? channels.map((channel, index) => {
                            if (channel.member_count > 0) {
                                return (
                                    <Fragment>
                                        <ListItem button={true} onPress={() => {
                                            this.props.props.navigation.push("messages-individual", { channel });
                                        }} style={styles.listitem} thumbnail>
                                            <Left>
                                                <Thumbnail square source={{ uri: channel.cover_url }} />
                                            </Left>
                                            <Body>
                                                <NativeText>{channel.created_by.nickname}</NativeText>
                                                <NativeText note numberOfLines={2}>{channel.custom_type}</NativeText>
                                            </Body>
                                            <Right>
                                                <Button transparent>
                                                    <NativeText>View</NativeText>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            }
                        }) : null}
                    </List>
                </View>
            );
          default:
            return null;
        }
    };
    render() {
        const { channels } = this.state;

        console.log("conversations index.js state", this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ marginTop: 10 }}>Conversations</Title>
                    </Left>
                   
                </Header>
                <View style={styles.container}>
                    <TabView 
                        tabBarPosition={"bottom"}
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        onIndexChange={(index) => {
                            this.setState({ index })
                        }}
                        renderScene={this.renderScene}
                    />
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
} 
export default connect(mapStateToProps, { })(MessagingConversationsHelper);