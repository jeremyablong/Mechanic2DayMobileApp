import React, { Fragment, useState, useEffect } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import axios from "axios";
import { Config } from "react-native-config";

const DesignedBoxScroll = (props) => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        console.log("mounted.");

        axios.get(`${Config.ngrok_url}/gather/roadside/assistance/listings`).then((res) => {
            if (res.data.message === "Successfully gathered roadside listings!") {
                console.log(res.data);

                const { listings } = res.data;

                setData(listings);
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
                        <Text style={styles.mainText}>Roadside Assistance</Text>
                        <Text style={styles.clientsText}>Get roadside assistance from our vast network of mechanics and tow drivers!</Text>
                        
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollViewTwo} contentContainerStyle={styles.contentContainerTwo}>
                            {data.map((roadside, index) => {
                                console.log("roadside ACCOUNT", roadside);
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        props.props.navigation.push("individual-listing-tow-company", { company: roadside });
                                    }}>
                                        <ImageBackground key={index} source={{ uri: roadside.company_image }} style={styles.innerContainerTwo}>
                                            <View style={styles.innerBox}>
                                            <View style={styles.centered}>
                                                    <Text style={styles.mainTextTwo}>Company: <Text style={{ color: "#FDE2FF" }}>{roadside.company_name}</Text></Text>
                                                    <Text style={styles.mainTextTwo}>Tier: <Text style={{ color: "#FDE2FF" }}>{roadside.standard_tow_fees.tier}</Text></Text>
                                                    <Text style={styles.mainTextTwo}>Standard Tow Fee: <Text style={{ color: "#FDE2FF" }}>${roadside.standard_tow_fees.tow_price.toString()}</Text></Text>
                                            </View>
                                                <AirbnbRating
                                                    count={5}
                                                    defaultRating={Math.floor(Math.random() * 5) + 1}
                                                    size={20} 
                                                    isDisabled={true} 
                                                    selectedColor={"gold"} 
                                                    showRating={false}
                                                />
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Fragment>
    );
}
export default DesignedBoxScroll;