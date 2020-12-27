import React, { Component, Fragment } from 'react'
import styles from "./styles.js";
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Button, Right, Body, Title, Text as NativeText, Content, Card, CardItem, Thumbnail } from 'native-base';
import SearchBar from 'react-native-search-bar';


class HomepageListingsCreateHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        searchValue: ""
    }
}
    handleSearch = () => {
        console.log("handleSearch");
    }
    handleCancelSearch = () => {
        console.log("handleCancelSearch");
    }
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Listings - Homepage</Title>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.navigate("list-vehicle-start");
                        }}>
                            <Image source={require('../../../../../../assets/icons/plus.png')} style={styles.iconSmaller} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={styles.container}>
                    <SearchBar
                        ref="searchBar"
                        placeholder="Search"
                        onChangeText={(value) => {
                            this.setState({
                                searchValue: value
                            })
                        }}
                        onSearchButtonPress={this.handleSearch}
                        onCancelButtonPress={this.handleCancelSearch}
                    />
                    <View style={[styles.centered, { marginTop: 15 }]}>
                        <View style={styles.centered}>
                            <Button style={styles.borderedButton} bordered success onPress={() => {
                                this.props.props.navigation.navigate("list-vehicle-start");
                            }}>
                                <NativeText style={{ color: "black" }}>List another vehicle</NativeText>
                            </Button>
                        </View>
                    </View>
                    
                    <Content style={{ padding: 20 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.activeListingText}>Active Listings</Text>
                            <Text>Active listings are listings that are still currently live and visible.</Text>
                        </View>
                        <Card style={styles.cardCustom}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={require("../../../../../../assets/images/broken-1.jpg")} />
                                <Body>
                                <Text>Broken 2015 honda civic with bad head gasket - in need of repair!</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Body>
                                <Image source={require("../../../../../../assets/images/broken-1.jpg")} style={{height: 250, width: "100%", flex: 1}}/>
                                <Text style={{ marginTop: 10 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec pretium sem, id mattis nisl. Vivamus volutpat tempus mauris. Etiam eget eros sit amet ex dapibus vestibulum venenatis in erat. Aliquam purus est, pharetra ac magna sed, condimentum vestibulum dui. In consequat eros ut facilisis finibus
                                </Text>
                            </Body>
                            </CardItem>
                            <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}>
                              
                                <Text>22 Offers</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button transparent textStyle={{color: '#87838B'}}>
                              
                                <Text>Show all "To-Do"</Text>
                                </Button>
                            </Right>
                            </CardItem>
                        </Card>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.activeListingText}>Innactive Listings</Text>
                            <Text>Inactive listings are listings that are old, removed or deleted.</Text>
                        </View>
                        </Content>
                </ScrollView>
            </Fragment>
        )
    }
}
export default HomepageListingsCreateHelper;