import React, { useEffect, useState } from "react";
import styles from "./styles.js";
import { Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { Config } from "react-native-config";
import moment from "moment";

const FillerContentMechanicsForHire = (props) => {
    const [data, setData] = useState([{
        name: "Jennifer Adams",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.5),
        id: 1,
        budget: 199,
        location: "Charlotte, NC"
    }, {
        name: "Jerhino Yelons",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.2),
        id: 2,
        budget: 299,
        location: "New York, NY"
    }, {
        name: "Beccanah Ulizes",
        background: "https://picsum.photos/200/200",
        rating: Math.round(5), 
        budget: 800,
        id: 3,
        location: "Asheville, NC"
    }, {
        name: "Steve Jobs",
        background: "https://picsum.photos/200/200",
        rating: Math.round(2.4), 
        id: 4,
        budget: 455,
        location: "Atlanta, GA"
    }, {
        name: "Bill Belca",
        background: "https://picsum.photos/200/200",
        rating: Math.round(2.7),
        id: 5,
        budget: 325,
        location: "Los Angeles, CA"
    }, {
        name: "Tommy Hillfiger",
        background: "https://picsum.photos/200/200",
        rating: Math.round(3.9),
        id: 6,
        budget: 99,
        location: "Austin, TX"
    }, {
        name: "Delvin Tiyopia",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.8),
        id: 7,
        budget: 466,
        location: "Palm Springs, FL"
    }, {
        name: "Alex Bullenchia",
        background: "https://picsum.photos/200/200",
        rating: Math.round(1.4),
        id: 8,
        budget: 901,
        location: "Baltimore, MA"
    }, {
        name: "Roger Adams",
        background: "https://picsum.photos/200/200",
        rating: Math.round(3.1),
        id: 9,
        budget: 642,
        location: "Portland, OR"
    }, {
        name: "Routin Luette",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.1),
        id: 10,
        budget: 242,
        location: "Mrytle Beach, SC"
    }, {
        name: "Jennifer Adams",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.5),
        id: 11,
        budget: 199,
        location: "Charlotte, NC"
    }, {
        name: "Jerhino Yelons",
        background: "https://picsum.photos/200/200",
        rating: Math.round(4.2),
        id: 12,
        budget: 299,
        location: "New York, NY"
    }, {
        name: "Beccanah Ulizes",
        background: "https://picsum.photos/200/200",
        rating: Math.round(5), 
        budget: 800,
        id: 13,
        location: "Asheville, NC"
    }, {
        name: "Steve Jobs",
        background: "https://picsum.photos/200/200",
        rating: Math.round(2.4), 
        id: 14,
        budget: 455,
        location: "Atlanta, GA"
    }]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        setTimeout(() => {
            axios.get(`${Config.ngrok_url}/gather/mechanics/promoted/all`).then((res) => {
                if (res.data.message === "Successfully gathered users!") {
                    console.log(res.data);

                    const { users } = res.data;

                    setUsers(users);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },  400);
    }, []);
    const calculateBirthdate = (birthdate, gender) => {
        const years = moment().diff(birthdate, 'years');

        return `${years} old - ${gender}`;
    }
    console.log("USERS!:", users);
    return (
        <View style={{ marginTop: -100 }}>
            <Text style={styles.flatlistTitle}>Mechanics For Hire</Text>
            <Text style={{ paddingLeft: 15, paddingBottom: 15 }}>Hire top tier mechanics or find lower rate mechanics if you're on a budget! We cover every area</Text>
            <FlatList 
                style={styles.flatListMain}
                data={users.slice(0, 8)}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            props.props.navigation.navigate("mechanic-for-hire-individual", { mechanic: item });
                        }} style={styles.flatlistItem}>
                            <Image source={{ uri: typeof item.profilePics !== "undefined" && item.profilePics.length > 0 ? item.profilePics[item.profilePics.length - 1].full_url : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} style={styles.specialImage} />
                            <View style={styles.specialRow}>
                                <View style={styles.left}>
                                    {/* <Image source={require("../../assets/icons/location-small.png")} style={{ maxWidth: 15, maxHeight: 15, marginRight: 10 }} /> */}
                                    <Text>{item.fullName}</Text>
                                </View>
                            </View>
                            <View style={styles.specialRow}>
                                <Text style={styles.mainTitle}>{calculateBirthdate(item.birthdate, item.gender)}</Text>
                            </View>
                            <View style={styles.specialRow}>
                                <View style={[styles.floatLeft, { flexDirection: "row" }]}>
                                    <Image source={require("../../assets/icons/small-star.png")} style={{ maxWidth: 20, maxHeight: 20 }} />
                                    <Text style={{ fontSize: 18 }}>({item.review_count}) Review(s)</Text>
                                </View>
                            </View>
                            <View style={styles.specialRow}>
                                <Text style={styles.pricePrice}>Member since {moment(item.register_system_date).format("MM-YYYY")}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
}
export default FillerContentMechanicsForHire;