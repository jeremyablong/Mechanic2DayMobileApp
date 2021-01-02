import React, { Component, Fragment } from 'react'
import { View, Text, Image, Dimensions, FlatList } from 'react-native';
import { Header, Left, Button, Title } from 'native-base';
import styles from './styles.js';
import { Config } from "react-native-config";
import axios from "axios";
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from "react-redux";

class IndividualMessagingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        messages: [
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 3,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 4,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 5,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 6,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 7,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 8,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
            }
        ],
        message: ""
    }
}
    componentDidMount() {
        setTimeout(() => {
            axios.get(`${Config.ngrok_url}/gather/individual/thread`, {
                params: {
                    channel: this.props.props.route.params.channel
                }
            }).then((res) => {
                if (res.data.message === "Successfully gathered thread!") {
                    console.log(res.data);
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },  500);
    }
    onSend = (messages) => {
        console.log("messages", messages);
    }
    render() {
        console.log("this.props individual/indivdiual", this.props);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Individual Chat - Messaging</Title>
                    </Left>
                   
                </Header>
                <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => {
                        this.onSend(messages)
                    }}
                />
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        fullName: state.auth.authenticated.fullName
    }
};
export default connect(mapStateToProps, {})(IndividualMessagingHelper);