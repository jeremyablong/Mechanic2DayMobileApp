import React, { Fragment, Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Text as NativeText, Button } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";

class TowCompanyManageDriversHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        drivers: []
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/tow/drivers/pending`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered Pending Drivers!") {
                console.log(res.data);
            } else { 
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
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
                        <Title>Manage</Title>
                        <Subtitle>Manage Tow Drivers</Subtitle>
                    </Body>
                    <Right>

                    </Right>
                </Header>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, {  })(TowCompanyManageDriversHelper);