import React, { Component, Fragment } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { height, width } = Dimensions.get("window");

class SubscriptionPlansSelectionHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [
            {id:1, price: 10.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "10 proposals/bids per month", tags:['ONE free promotion per month', 'FREE 24/7 SUPPORT', 'Standard Support' ]},
            {id:2, price: 20.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "20 proposals/bids per month", tags:['ONE free promotion per month', 'FREE 24/7 SUPPORT', 'Standard Support' ]}, 
            {id:3, price: 30.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", name: "30 proposals/bids per month", tags:['ONE free promotion per month', 'FREE 24/7 SUPPORT', 'Standard Support', "Access to premier content" ]}, 
            {id:4, price: 40.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar4.png", name: "40 proposals/bids per month", tags:['TWO free promotions per month', 'FREE 24/7 SUPPORT', 'Standard Support', "Access to premier content" ]}, 
            {id:5, price: 50.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar5.png", name: "50 proposals/bids per month", tags:['TWO free promotions per month', 'FREE 24/7 SUPPORT', 'Data analytics', "Portal access", "Priority Customer Support", "Access to premier content" ]}, 
            {id:6, price: 74.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar6.png", name: "100 proposals/bids per month", tags:['TWO free promotions per month', 'FREE 24/7 SUPPORT', 'Data analytics', "Portal access", "Priority Customer Support", "Access to premier content" ]}, 
            {id:7, price: 84.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "125 proposals/bids per month", tags:['THREE free promotions per month', 'FREE 24/7 SUPPORT', 'Data analytics', "Portal access", "Priority Customer Support", "Access to premier content" ]}, 
            {id:8, price: 99.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "150 proposals/bids per month", tags:['THREE free promotions per month', 'FREE 24/7 SUPPORT', 'Data analytics', "Portal access", "Priority Customer Support", "Access to premier content" ]},
            {id:9, price: 124.99, color:"black", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", name: "200 proposals/bids per month", tags:['THREE free promotions per month', 'FREE 24/7 SUPPORT', 'Data analytics', "Portal access", "Priority Customer Support", "Access to premier content" ]},
        ]
    }
}
    renderTags = (item) =>{
        return item.tags.map((tag, key) => {
            return (
                <View key={key} style={styles.btnColor}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>{tag}</Text>
                </View> 
            );
        })
    }
    handleSubmission = (item) => {
       console.log("item", item); 
    }
    render() {
        return (
            <Fragment>
                <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={{ paddingBottom: 55 }}>
                    <View style={styles.margin}>
                        <Text style={styles.titleMain}>Select your subscription (re-occuring payments) plan.</Text>
                        <View style={styles.hr} />
                        <Text style={styles.italizedRed}>Subscription commitment is a <Text style={{ fontWeight: "bold" }}>commitment</Text> to 12 (twelve) months at whatever rate selected. You may alter and change your plans but if you'd like to cancel, you would need to pay ONE (1) month penalty per our <Text style={{ fontWeight: "bold" }}>Terms & Conditions.</Text></Text>
                        <View style={styles.hr} />
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 34, textDecorationLine: "underline" }}>Subscription plans</Text>
                        <Text style={{ textAlign: "center", fontStyle: "italic", fontWeight: "bold" }}>*Recurring*</Text>
                    </View>
                    <FlatList 
                        style={styles.notificationList}
                        data={this.state.data}
                        keyExtractor= {(item) => {
                            return item.id;
                        }}
                        renderItem={({item}) => {
                            return (
                            <View style={[styles.card, {borderColor:item.color}]}>
                                <View style={styles.cardContent}>
                              
                                <Text style={styles.name}>{item.name}</Text>
                                
                                </View>
                              
                                <View style={[styles.cardContent, styles.tagsContent]}>
                                    {this.renderTags(item)}
                                </View>
                                <View style={[styles.hr, { marginBottom: -30 }]} />
                                <View style={styles.margin}>
                                    <Text style={styles.price}>$<Text style={{ fontSize: 34, color: "black" }}>{item.price.toString()}</Text> Per Month</Text>
                                </View>
                                <View style={styles.hrCustom} />
                                <View style={styles.margin}>
                                    <AwesomeButtonBlue onPress={() => {
                                        this.handleSubmission(item);
                                    }} width={width * 0.85} textColor={"black"} type={"secondary"}><Text style={{ fontWeight: "bold" }}>Select subscription for ${item.price.toString()}</Text></AwesomeButtonBlue>
                                </View>
                            </View>
                            )
                        }}/>
                </ScrollView>
                </View>
            </Fragment>
        )
    }
}
export default SubscriptionPlansSelectionHelper;