import React, { Fragment, useState } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AirbnbRating } from 'react-native-ratings';


const ActiveClientsLookingHelper = (props) => {
    const [data, setData] = useState([{
        name: "Johnny Despora",
        background: "https://i.pravatar.cc/300",
        overall_review: 4.5,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Jeremy Smithino",
        background: "https://i.pravatar.cc/300",
        overall_review: 2.5,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Sarah benckencs",
        background: "https://i.pravatar.cc/300",
        overall_review: 4.1,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Adam Weloncho",
        background: "https://i.pravatar.cc/300",
        overall_review: 4.8,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Tiffany Belca",
        background: "https://i.pravatar.cc/300",
        overall_review: 1.5,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Rodreguez Alszo",
        background: "https://i.pravatar.cc/300",
        overall_review: 2.4,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Timmothy Smith",
        background: "https://i.pravatar.cc/300",
        overall_review: 2.9,
        review_count: Math.round((Math.random() * 10) + 1)   
    }, {
        name: "Alex Frenchehan",
        background: "https://i.pravatar.cc/300",
        overall_review: 3.2,
        review_count: Math.round((Math.random() * 10) + 1)
    }, {
        name: "Tilda Becenns",
        background: "https://i.pravatar.cc/300",
        overall_review: 3.9,
        review_count: Math.round((Math.random() * 10) + 1)
    }])
    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={[styles.mainText, { color: "black" }]}>Hire & browse mechanics and/or industry experts</Text>
                <Text style={[styles.clientsText, { color: "black" }]}>These are promoted accounts for mechanics on our platform - these people chose to "boost" their profile...</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {data.map((user, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {}}>
                                <ImageBackground source={{ uri: user.background }} style={styles.innerContainer}>
                                    <View style={styles.middleContent}>
                                        <Text style={styles.firstText}>{user.name}</Text>
                                        <AirbnbRating
                                            count={5}
                                            defaultRating={user.overall_review}
                                            size={22} 
                                            isDisabled={true} 
                                            selectedColor={"gold"} 
                                            showRating={true}
                                        />
                                        <Text style={styles.reviewCount}>{user.review_count} Review(s)</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </Fragment>
    );
}
export default ActiveClientsLookingHelper;