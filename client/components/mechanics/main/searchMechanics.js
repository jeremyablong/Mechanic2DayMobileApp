import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
  } from 'react-native';
import { Button, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import SearchBar from 'react-native-search-bar';
import { connect } from "react-redux";
import { Config } from "react-native-config";
import axios from "axios";
import moment from "moment";
import {
    BarIndicator
} from 'react-native-indicators';

class SearchMechanicsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        ready: false,
        searchValue: ""
    };
}
    handleSearch = () => {
        console.log("handleSearch clicked");
    }
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/mechanics`).then((res) => {
            console.log("/gather/mechanics", res.data);

            const { mechanics } = res.data;

            this.setState({
                mechanics,
                ready: true
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateAge = (date) => {
        return moment(date).format("MM-DD-YYYY");
    }
    render() {
        const { ready } = this.state;
        
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Search Mechanics</Title>
                        <Subtitle>Search/browse mechanics</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <SearchBar
                        ref="searchBar"
                        placeholder="Search for a user's full name..."
                        onChangeText={(value) => {
                            this.setState({
                                searchValue: value
                            })
                        }}
                        onSearchButtonPress={() => {
                            this.handleSearch();
                        }}
                        onCancelButtonPress={() => {
                            this.setState({
                                searchValue: ""
                            })
                        }}
                        value={this.state.searchValue}
                    />
                    {ready === true ? <FlatList style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={this.state.mechanics}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor= {(item) => {
                            return item.id;
                        }}
                        renderItem={({item}) => {
                            console.log("MECHANCIC ITEM", item);
                            if (item.fullName.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                                return (
                                    <TouchableOpacity style={styles.card} onPress={() =>  {
                                        this.props.props.navigation.navigate("mechanic-for-hire-individual", { mechanic: item });
                                    }}>
                                        <View style={styles.cardHeader}>
                                        <Image style={styles.icon} source={{uri:"https://img.icons8.com/flat_round/64/000000/hearts.png"}}/>
                                        </View>
                                        <Image style={styles.userImage} source={{ uri: item.profilePics[item.profilePics.length - 1].full_url }}/>
                                        <View style={styles.cardFooter}>
                                        <View style={{alignItems:"center", justifyContent:"center"}}>
                                            <Text style={styles.name}>{item.fullName}</Text>
                                            <Text style={styles.position}>Member since {this.calculateAge(item.register_system_date)}</Text>
                                        </View>
                                            
                                        </View>
                                        <View style={styles.row}>
                                            <Image source={require("../../../assets/icons/small-star.png")} style={styles.star} />
                                            <Text style={styles.starText}>{item.review_count} Review(s)</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                    }}/> : <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
                            <BarIndicator count={14} color='blue' />
                        </View>
                    </View>}
                </View>
            </Fragment>
        )
    }
}
export default SearchMechanicsHelper;