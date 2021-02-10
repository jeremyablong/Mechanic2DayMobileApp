import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, ListItem, List, Icon } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import moment from "moment";


const { height, width } = Dimensions.get("window");


class PaymentAnalyticsDashboardHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        payouts: [],
        payout: null
    };
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/past/payouts`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered payouts!") {
                console.log(res.data);

                const { payouts } = res.data;

                this.setState({
                    payouts: payouts.data
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculate = (type) => {
        switch (type) {
            case "bank_account":
                return "Bank Account Transfer";
                break;
            default: 

                break;
        }
    }
    render() {
        const { payouts, payout } = this.state;

        console.log("this.state analytics state", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Payout Report</Title>
                        <Subtitle>Payout report, stats & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ padbpaddingBottom: 125 }} style={styles.container}>
                    <List>
                        {typeof payouts !== "undefined" && payouts.length > 0 ? payouts.map((payout, index) => {
                            return (
                                <View style={{ minHeight: 75 }}>
                                    <ListItem button={true} onPress={() => {
                                        this.setState({
                                            payout
                                        }, () => {
                                            if (this.state.payout !== null) {
                                                this.RBSheet.open()
                                            } 
                                        })
                                    }}>
                                        <Body>
                                        <Text style={{ fontSize: 16 }} numberOfLines={2}>Type - {this.calculate(payout.type)} {"\n"}<Text style={{ color: "grey" }}>Status - {payout.status}</Text></Text>
                                        </Body>
                                        <Right>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>${(payout.amount / 100).toFixed(2)}</Text>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </View>
                            );
                        }) : null}
                    </List>
                </ScrollView>
                {payout !== null ?  <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                    >
                        <Fragment><View style={{ margin: 20 }}>
                            <Text style={styles.texter}><Text style={{ fontWeight: "bold" }}>Amount Transfered</Text> - ${(payout.amount / 100).toFixed(2)}</Text>
                            <View style={styles.hr} />
                            <Text style={styles.texter}><Text style={{ fontWeight: "bold" }}>Arrival Date</Text> - {moment(payout.arrival_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                            <View style={styles.hr} />
                            <Text style={styles.texter}><Text style={{ fontWeight: "bold" }}>Automatic</Text> - {payout.automatic === true ? "Yes" : "No"}</Text>
                            <View style={styles.hr} />
                            <Text style={styles.texter}><Text style={{ fontWeight: "bold" }}>Status</Text> - {payout.status}</Text>
                            <View style={styles.hr} />
                            <Text style={styles.texter}><Text style={{ fontWeight: "bold" }}>Account Type</Text> - {this.calculate(payout.type)}</Text>
                        </View>
                        <View style={styles.bottomPosition}>
                            <AwesomeButtonCartman backgroundDarker={"black"} borderColor={"black"} textColor={"white"} type={"secondary"} onPress={() => {
                                this.RBSheet.close();
                            }} width={width}>Close/Exit</AwesomeButtonCartman>
                        </View></Fragment>
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
export default connect(mapStateToProps, { })(PaymentAnalyticsDashboardHelper);