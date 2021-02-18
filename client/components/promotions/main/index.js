import React, { Component, Fragment } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from "react-native-config";
import moment from "moment";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


class PromotionsMainHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        mechanics: [],
        drivers: []
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/mechanics/promoted/all`).then((res) => {
            console.log(res.data);

            const { users } = res.data;

            this.setState({
                mechanics: users
            })
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${Config.ngrok_url}/gather/towtruck/drivers/promoted`).then((res) => {
            console.log(res.data);

            const { drivers } = res.data;

            this.setState({
                drivers
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { mechanics, drivers } = this.state;

        console.log("this.state promotions main index.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                        <Image source={require("../../../assets/icons/go-back.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        <NativeText style={{ color: "black" }}>Back</NativeText>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Promoted Main</Title>
                        <Subtitle>Promoted content & more</Subtitle>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={{ margin: 10 }}>
                    <Text style={[styles.title, { marginTop: 10 }]}>Promoted <Text style={{ color: "blue" }}>users/mechanics</Text> by boost and/or paid purchases</Text>
                    <Text>These users are paid "boosts" and/or "promoted" accounts. These are eager workers and they're looking for work!</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{  }} style={styles.container}>
                            {typeof mechanics !== "undefined" && mechanics.length > 0 ? mechanics.slice(0, 15).map((item, index) => {
                                console.log("PENT", item);

                                const end = moment(new Date());
                                const start = moment(new Date(item.register_system_date));
                                let calculatedDate = moment.duration(end.diff(start)).asMonths();

                                const string = `Registered ${calculatedDate.toFixed(2)} Months ago`;

                                const dateee = moment(item.birthdate, "YYYY-MM-DD").format("YYYY");

                                const currentYear = moment().format("YYYY");

                                const currentAge = currentYear - dateee;

                                if (calculatedDate < 1) {
                                    calculatedDate = `Registered ${(moment.duration(end.diff(start)).asDays()).toFixed(0)} days ago`;
                                } else {
                                    calculatedDate = string;
                                }

                                console.log("calculatedDate", calculatedDate);
                                return (
                                    <TouchableOpacity key={index} style={styles.card} onPress={() =>  {
                                        this.props.props.navigation.navigate("mechanic-for-hire-individual", { mechanic: item });
                                    }}>
                                        <View style={styles.cardHeader}>
                                        <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }}/>
                                        </View>
                                        <Image style={styles.userImage} source={{ uri: item.profilePics.length > 0 ? item.profilePics[item.profilePics.length - 1].full_url : Config.not_available }}/>
                                        <View style={styles.cardFooter}>
                                        <View style={{alignItems:"center", justifyContent:"center"}}>
                                            <Text style={styles.name}>{item.fullName}</Text>
                                            <Text style={styles.position}>{calculatedDate}</Text>
                                            <Text style={styles.position}>{currentAge} years old</Text>
                                        </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }) : <SkeletonPlaceholder>
                                <View style={styles.skelBox}>
                                   
                                </View>
                                </SkeletonPlaceholder>}
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.title}>Promoted <Text style={{ color: "blue" }}>tow truck companies</Text></Text>
                            <Text>These are tow truck companies employee's "promoted" or "boosted" to make their services more visible. These drivers are representations of the companies they work for</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ }} style={[styles.container, { marginTop: 15 }]}>
                            {typeof drivers !== "undefined" && drivers.length > 0 ? drivers.slice(0, 15).map((item, index) => {
                                    console.log("TOW DRIVERRRRRRRR", item);

                                    return (
                                        <TouchableOpacity key={index} style={styles.card} onPress={() =>  {
                                            
                                        }}>
                                            <View style={styles.cardHeader}>
                                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }}/>
                                            </View>
                                            <Image style={styles.userImage} source={{ uri: item.profilePics.length > 0 ? item.profilePics[item.profilePics.length - 1].full_url : Config.not_available }}/>
                                            <View style={styles.cardFooter}>
                                            <View style={{alignItems:"center", justifyContent:"center"}}>
                                                <Text style={styles.name}>{item.fullName}</Text>
                                                <Text style={styles.position}>Associated Co. - {item.company_name}</Text>
                                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                                    <Image source={require("../../../assets/icons/small-star.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                                    <Text style={[styles.position, { marginTop: 0 }]}>({item.review_count}) Reviews</Text>
                                                </View>
                                            </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }) : <SkeletonPlaceholder>
                                <View style={styles.skelBox}>
                                   
                                </View>
                                </SkeletonPlaceholder>}
                            </ScrollView>
                        </View>
                        <Text style={styles.title}>Promoted <Text style={{ color: "blue" }}>users/mechanics</Text> by boost and/or paid purchases</Text>
                    <Text>These users are paid "boosts" and/or "promoted" accounts. These are eager workers and they're looking for work!</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{  }} style={styles.container}>
                            {typeof mechanics !== "undefined" && mechanics.length > 0 ? mechanics.slice(0, 15).map((item, index) => {
                                console.log("PENT", item);

                                const end = moment(new Date());
                                const start = moment(new Date(item.register_system_date));
                                let calculatedDate = moment.duration(end.diff(start)).asMonths();

                                const string = `Registered ${calculatedDate.toFixed(2)} Months ago`;

                                const dateee = moment(item.birthdate, "YYYY-MM-DD").format("YYYY");

                                const currentYear = moment().format("YYYY");

                                const currentAge = currentYear - dateee;

                                if (calculatedDate < 1) {
                                    calculatedDate = `Registered ${(moment.duration(end.diff(start)).asDays()).toFixed(0)} days ago`;
                                } else {
                                    calculatedDate = string;
                                }

                                console.log("calculatedDate", calculatedDate);
                                return (
                                    <TouchableOpacity key={index} style={styles.card} onPress={() =>  {
                                        this.props.props.navigation.navigate("mechanic-for-hire-individual", { mechanic: item });
                                    }}>
                                        <View style={styles.cardHeader}>
                                        <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }}/>
                                        </View>
                                        <Image style={styles.userImage} source={{ uri: item.profilePics.length > 0 ? item.profilePics[item.profilePics.length - 1].full_url : Config.not_available }}/>
                                        <View style={styles.cardFooter}>
                                        <View style={{alignItems:"center", justifyContent:"center"}}>
                                            <Text style={styles.name}>{item.fullName}</Text>
                                            <Text style={styles.position}>{calculatedDate}</Text>
                                            <Text style={styles.position}>{currentAge} years old</Text>
                                        </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }) : <SkeletonPlaceholder>
                                <View style={styles.skelBox}>
                                   
                                </View>
                                </SkeletonPlaceholder>}
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.title, { marginTop: 10 }]}>Promoted <Text style={{ color: "blue" }}>tow truck companies</Text></Text>
                            <Text>These are tow truck companies employee's "promoted" or "boosted" to make their services more visible. These drivers are representations of the companies they work for</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ }} style={[styles.container, { marginTop: 15 }]}>
                            {typeof drivers !== "undefined" && drivers.length > 0 ? drivers.slice(0, 15).map((item, index) => {
                                    console.log("TOW DRIVERRRRRRRR", item);

                                    return (
                                        <TouchableOpacity key={index} style={styles.card} onPress={() =>  {
                                            
                                        }}>
                                            <View style={styles.cardHeader}>
                                            <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }}/>
                                            </View>
                                            <Image style={styles.userImage} source={{ uri: item.profilePics.length > 0 ? item.profilePics[item.profilePics.length - 1].full_url : Config.not_available }}/>
                                            <View style={styles.cardFooter}>
                                            <View style={{alignItems:"center", justifyContent:"center"}}>
                                                <Text style={styles.name}>{item.fullName}</Text>
                                                <Text style={styles.position}>Associated Co. - {item.company_name}</Text>
                                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                                    <Image source={require("../../../assets/icons/small-star.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                                    <Text style={[styles.position, { marginTop: 0 }]}>({item.review_count}) Reviews</Text>
                                                </View>
                                            </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }) : <SkeletonPlaceholder>
                                <View style={styles.skelBox}>
                                   
                                </View>
                                </SkeletonPlaceholder>}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
export default PromotionsMainHomepageHelper;