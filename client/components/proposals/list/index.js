import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Button, Title, Text as NativeText, Thumbnail, Body, ListItem, List, Right } from 'native-base';
import { Config } from 'react-native-config';
import axios from "axios";
import { connect } from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const { width, height } = Dimensions.get("window");

class ProposalsListHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        proposals: [],
        ready: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/proposals/list`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered proposals!") {
                console.log("res.data", res.data);

                const { proposals } = res.data;

                const promiseee = new Promise((resolve, reject) => {
                    if (proposals.length > 0) {
                        for (let index = 0; index < proposals.length; index++) {
                            const proposal = proposals[index];
                            
                            axios.post(`${Config.ngrok_url}/gather/breif/data`, {
                                proposal
                            }).then((ressss) => {
                                if (ressss.data.message === "Gathered user's data!") {
                                    console.log("ressss.data INNER", ressss.data);
        
                                    if (ressss.data.user.profilePics.length > 0) {
                                        proposal.profilePic = ressss.data.user.profilePics[ressss.data.user.profilePics.length - 1].full_url;
                                    } else {
                                        proposal.profilePic = "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg";
                                    }
                                    proposal.fullName = ressss.data.user.fullName;

                                    this.setState({
                                        proposals: [...this.state.proposals, proposal]
                                    }, () => {
                                        if ((proposals.length - 1) === index) {
                                            resolve();
                                        } 
                                    })
                                } else {
                                    console.log("Err", res.data);

                                    if ((proposals.length - 1) === index) {
                                        resolve();
                                    } 
                                }
                            }).catch((err) => {
                                console.log(err);

                                if ((proposals.length - 1) === index) {
                                    resolve();
                                } 
                            })
                        }
                    } 
                })

                promiseee.then((passedData) => {
                    this.setState({
                        ready: true
                    })
                })
            } else {
                console.log("ERr", res.data);
            }
        }).catch((err) => {
            console.log("critical err", err);
        })
    }
    renderUntilReady = () => {
        if (this.state.proposals.length === 0) {
            return (
                <Fragment>
                    <View style={{ margin: 20 }}>
                        <Text style={styles.headerHeader}>You do not have any proposals yet,  stay tuned as applicants start to apply for your job!</Text>
                        <Text style={{ marginTop: 10 }}>Whenever some applies to a job you have posted, it will show up here...</Text>
                        <View style={styles.hr} />
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, marginTop: 15, marginBottom: 15 }}>There are currently 0 pending proposals...</Text>
                        <View style={[styles.hr, { marginBottom: 30 }]} />
                        <View style={styles.center}>
                            <View style={styles.center}>
                                <AwesomeButtonRick width={width * 0.75} backgroundShadow={"#E8CEE4"} onPress={() => {
                                    console.log("clicked");

                                    this.props.props.navigation.push("active-jobs");
                                }} type="secondary">
                                    <Image source={require("../../../assets/icons/make.png")} style={{ maxWidth: 40, maxHeight: 40 }}/>
                                    <Text> View active jobs</Text>
                                </AwesomeButtonRick>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
        } else {
            if (this.state.ready === false) {
                return (
                    <Fragment>
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                                <SkeletonPlaceholder>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width, height: 250 }} />
                                    </View>
                                    
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                            
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                        
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                    
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                    
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
                                    
                                        <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: width * 0.70, height: 50, borderRadius: 4 }} />
                                        <View
                                            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                        />
                                        </View>
                                    </View>
                                </SkeletonPlaceholder>
                        </ScrollView>
                    </Fragment>
                );
            }
        }
    }
    render() {
        const { proposals, ready } = this.state;

        console.log(this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("homepage-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                  
                        </Button>
                        <Title style={{ marginTop: 10 }}>Proposals/Applicants</Title>
                    </Left>
                   
                </Header>
                <View style={styles.container}>
                       <List>
                       {typeof proposals !== "undefined" && proposals.length > 0 && ready === true ? proposals.map((proposal) => {
                            return (
                                <ListItem button={true} onPress={() => {
                                    this.props.props.navigation.navigate("proposals-individual-view", { proposal });
                                }} thumbnail>
                                    <Left>
                                        <Thumbnail square source={{ uri: proposal.profilePic }} />
                                    </Left>
                                    <Body>
                                        <NativeText>{proposal.fullName}</NativeText>
                                        <NativeText note numberOfLines={1}>{proposal.description}</NativeText>
                                    </Body>
                                    <Right>
                                        <Button onPress={() => {
                                            this.props.props.navigation.navigate("proposals-individual-view", { proposal });
                                        }} transparent>
                                        <NativeText>View</NativeText>
                                        </Button>
                                    </Right>
                                </ListItem>
                            );
                       }) : this.renderUntilReady()} 
                       </List>
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
export default connect(mapStateToProps, { })(ProposalsListHelper);