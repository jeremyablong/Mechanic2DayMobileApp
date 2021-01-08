import React, { Component, Fragment } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, ListItem, List, Thumbnail } from 'native-base';
import axios from "axios";
import { Config } from 'react-native-config';
import { connect } from 'react-redux';
import styles from './styles.js';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RBSheet from "react-native-raw-bottom-sheet";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const { height, width } = Dimensions.get("window");

class NotificationsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        notifications: [],
        ready: false,
        notification: null,
        index: 0,
        selected: null
    }
    this.reference = [];
}

    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/notifications`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully gathered notifications!") {
                console.log(res.data);

                const { notifications } = res.data;

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < notifications.length; index++) {
                        const notification = notifications[index];
                        
                        axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
                            id: notification.from
                        }).then((res) => {
                            if (res.data) {
                                console.log("res.data", res.data);
    
                                const { user } = res.data;
    
                                if (user.profilePics.length > 0) {
                                    notification.full_url = user.profilePics[user.profilePics.length - 1].full_url;
                                    notification.fullName = user.fullName;
        
                                    this.setState({
                                        notifications: [notification, ...this.state.notifications]
                                    }, () => {
                                        if ((notifications.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                } else {
                                    notification.full_url = "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg";
                                    notification.fullName = user.fullName;
        
                                    this.setState({
                                        notifications: [notification, ...this.state.notifications]
                                    }, () => {
                                        if ((notifications.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                }
                            } else {
                                console.log("err", res.data);

                                const { user } = res.data;

                                notification.full_url = "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg";
                                notification.fullName = user.fullName;

                                this.setState({
                                    notifications: [notification, ...this.state.notifications]
                                }, () => {
                                    if ((notifications.length - 1) === index) {
                                        resolve();
                                    }
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                })
                promiseee.then(() => {
                    this.setState({
                        ready: true
                    })
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    deleteNotification = () => {
        const { notification } = this.state;

        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/delete/notification`, {
                id: this.props.unique_id,
                notification
            }).then((res) => {
                console.log(res.data);
    
                const { deleted } = res.data;
    
                if (res.data.message === "Successfully deleted notification!") {
                    this.setState({
                        notifications: this.state.notifications.filter((item) => {
                            if (item.id !== deleted.id) {
                                return item;
                            }
                        })
                    }, () => {
                        this.reference[this.state.index].close();
                    })
                }
            }).catch((err) => {
                console.log("err", err);
            })
        }, 750)
    }
    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <View style={styles.center}>
              <Button danger style={styles.leftAction} onPress={this.deleteNotification}>
                <Animated.Text
                style={[
                    styles.actionText
                ]}>
                Delete
                </Animated.Text>
            </Button>
          </View>
        );
    };
    skelatonRender = () => {
        if (true) {
            return (
                <SkeletonPlaceholder>
                    
                    
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                    <View style={{ width: width, height: 60 }} />
                    <View style={{ marginTop: 20 }} />
                </SkeletonPlaceholder>
            );
        }
    }
    render() {
        const { notifications, ready, selected } = this.state;

        console.log("this.state!!!!", this.state);
        return (
           <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                        <Image source={require("../../assets/icons/go-back.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        <NativeText style={{ color: "black" }}>Back</NativeText>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <NativeText style={{ color: "black" }}>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <List>
                    {typeof notifications !== "undefined" && notifications.length > 0 && ready === true ? notifications.map((notification, index) => {
                        console.log("notification", notification);
                        return (
                            <Fragment key={index}>
                                <Swipeable key={index} ref={ref => {
                                    this.reference[index] = ref;
                                }} onSwipeableRightOpen={() => {
                                    this.setState({
                                        notification,
                                        index
                                    })
                                }} renderRightActions={this.renderRightActions}>
                                    <ListItem button={true} onPress={() => {
                                        this.reference[this.state.index].close();
                                        this.setState({
                                            selected: notification
                                        }, () => {
                                            this.RBSheet.open();
                                        })
                                    }} avatar>
                                        <Left>
                                            <Thumbnail source={{ uri: notification.full_url }} />
                                        </Left>
                                        <Body>
                                            <NativeText>{notification.data.title}</NativeText>
                                            <NativeText numberOfLines={2} note>{notification.data.body}</NativeText>
                                        </Body>
                                        
                                    </ListItem>
                                </Swipeable>
                            </Fragment>
                        );
                    }) : this.skelatonRender()}
                    </List>
                </View>
                {selected !== null ? <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={275}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                    >
                    <Fragment>
                        <View style={{ margin: 20 }}>
                            <View style={styles.topLeftCorner}>
                                <Text>{selected.date}</Text>
                            </View>
                            <View style={styles.centerAll}>
                                <Text style={styles.title}>{selected.data.title}</Text>
                                <Text numberOfLines={4} style={styles.desc}>{selected.data.body}</Text>
                            </View>
                           
                        </View>
                        <View style={styles.bottomLeft}>
                            <Text style={styles.name}>Notification initiator: {selected.fullName}</Text>
                        </View>
                    </Fragment>
                </RBSheet> : null}
           </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, {  })(NotificationsHelper);