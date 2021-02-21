import React, { Fragment, useState, useEffect } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import axios from "axios";
import { Config } from "react-native-config";
import _ from "lodash";

const TowTruckDriversHelper = (props) => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        console.log("mounted.");

        axios.get(`${Config.ngrok_url}/gather/towtruck/drivers/promoted`).then((res) => {
            if (res.data.message === "Successfully gathered tow truck driver listings!") {
                console.log(res.data);

                const { drivers } = res.data;

                const shuffled = _.shuffle(drivers);

                setData(shuffled);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <Fragment>
            <View style={styles.container}>
                
                <View style={styles.outterContainer}>
                    <View style={styles.boxOne}>
                        <Text style={styles.mainText}>Promoted Tow Truck Drivers - Batch #1</Text>
                        <Text style={styles.clientsText}>These are promoted/boosted tow drivers from our top clients!</Text>
                        
                    </View>
                    <View style={{ flex: 1, minHeight: 300 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollViewTwo} contentContainerStyle={styles.contentContainerTwo}>
                            {data.slice(0, 9).map((driver, index) => {
                                console.log("driver ACCOUNT", driver);

                                if (driver.completed_stripe_onboarding === true) {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            props.props.navigation.push("tow-truck-drivers-request", { driver });
                                        }}>
                                            <ImageBackground key={index} source={{ uri: driver.profilePics.length > 0 ? driver.profilePics[driver.profilePics.length - 1].full_url : "https://s3.wasabisys.com/mechanic2day/not-availiable.jpg" }} style={styles.innerContainerTwo}>
                                                <View style={styles.innerBox}>
                                                <View style={styles.centered}>
                                                        <Text style={styles.mainTextTwo}>Driver Name - <Text style={{ color: "#FDE2FF" }}>{driver.fullName}</Text></Text>
                                                        <Text style={styles.mainTextTwo}>Associated Co. - <Text style={{ color: "#FDE2FF" }}>{driver.company_name}</Text></Text>
                                                        <Text style={styles.mainTextTwo}>Gender - <Text style={{ color: "#FDE2FF" }}>{driver.gender}</Text></Text>
                                                </View>
                                                    {/* <AirbnbRating
                                                        count={5}
                                                        defaultRating={Math.floor(Math.random() * 5) + 1}
                                                        size={20} 
                                                        isDisabled={true} 
                                                        selectedColor={"gold"} 
                                                        showRating={false}
                                                    /> */}
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    );
                                }
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={[styles.outterContainer, { top: -150, marginBottom: -100 }]}>
                    <View style={styles.boxOne}>
                        <Text style={styles.mainText}>Promoted Tow Truck Drivers - Batch #2</Text>
                        <Text style={styles.clientsText}>These are promoted/boosted tow drivers from our top clients!</Text>
                        
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollViewTwo} contentContainerStyle={styles.contentContainerTwo}>
                            {data.slice(0, 10).map((driver, index) => {
                                console.log("driver ACCOUNT", driver);

                                if (driver.completed_stripe_onboarding === true) {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            props.props.navigation.push("tow-truck-drivers-request", { driver });
                                        }}> 
                                            <ImageBackground key={index} source={{ uri: driver.profilePics.length > 0 ? driver.profilePics[driver.profilePics.length - 1].full_url : "https://s3.wasabisys.com/mechanic2day/not-availiable.jpg" }} style={styles.innerContainerTwo}>
                                                <View style={styles.innerBox}>
                                                    <View style={styles.centered}>
                                                            <Text style={styles.mainTextTwo}>Driver Name - <Text style={{ color: "#FDE2FF" }}>{driver.fullName}</Text></Text>
                                                            <Text style={styles.mainTextTwo}>Associated Co. - <Text style={{ color: "#FDE2FF" }}>{driver.company_name}</Text></Text>
                                                            <Text style={styles.mainTextTwo}>Gender - <Text style={{ color: "#FDE2FF" }}>{driver.gender}</Text></Text>
                                                    </View>
                                                    {/* <AirbnbRating
                                                        count={5}
                                                        defaultRating={Math.floor(Math.random() * 5) + 1}
                                                        size={20} 
                                                        isDisabled={true} 
                                                        selectedColor={"gold"} 
                                                        showRating={false}
                                                    /> */}
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    );
                                }
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Fragment>
    );
}
export default TowTruckDriversHelper;