import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import IntroSlider from "./components/intro/intro.js";
import SignupPageOnePage from "./pages/signup/index.js";
import VerifyCodeEmailPage from "./pages/signup/verifyEmailCode/verify.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNamePasswordPage from "./pages/signup/createNamePassword/create.js";
import CreateBirthdayPage from "./pages/signup/createBirthday/create.js";
import GenderSelectionPage from "./pages/signup/gender/select.js";
import LocationCreatePage from "./pages/signup/location/index.js";
import CreateAccountTypePage from "./pages/signup/accountType/mechanicOrClient.js";
import HomepageMainPage from "./pages/homepage/index.js";
import ProfileMainPage from "./pages/account/profile/main.js";
import EditPersonalInfoPage from "./pages/account/personal/mainInfo/info.js";
import VerfiyPhoneNumberPage from "./pages/signup/phone/verify.js";
import SigninPage from "./pages/signin/signin.js";
import EmergencyContactHomePage from "./pages/account/emergency/contact/index.js";
import PaymentMainPage from "./pages/account/payments/index.js";
import EditPaymentMethodsPage from "./pages/account/payments/paymentMethods/index.js";
import PaymentCardAddNewPage from "./pages/account/payments/create/paymentCardCreate.js";
import AddCardPage from "./pages/account/payments/create/addCard.js";
import IndividualCreditDebitCardPage from "./pages/account/payments/paymentMethods/individual/index.js";
import CreditsHomepagePage from "./pages/account/payments/credits/index.js";
import ViewPublicProfilePage from "./pages/account/profile/public/profile/publicProfile.js";
import MessagingConversationsPage from "./pages/messaging/conversations/index.js";
import IndividualBrokenVehiclePage from "./pages/listings/vehicles/individual/index.js";
import MapViewAllListingsPage from "./pages/listings/main.js";
import GetLocation from 'react-native-get-location';
import { gatherLocationOnLoad } from "./actions/location/location.js";
import MechanicListingPage from "./pages/listings/mechanics/mechanicListing.js";
import HomepageListingsCreatePage from "./pages/listings/create/clients/create/main/index.js";
import PreviewStepsBrokenVehicleListingPage from "./pages/listings/create/clients/create/preview/index.js";
import PageOneVehicleFormPage from "./pages/listings/create/clients/create/one/index.js";
import LocationDetailsListVehiclePage from "./pages/listings/create/clients/create/location/index.js";
import UploadPhotosVehicleListingPage from "./pages/listings/create/clients/create/photos/index.js";
import AvailablityCreationPage from "./pages/listings/create/clients/create/avaliability/index.js";
import PricingAdjustmentPage from "./pages/listings/create/clients/create/pricing/index.js";
import NotificationsPage from "./pages/notifications/index.js";
import CategoriesMainPage from "./pages/categories/index.js";
import IndividualMessagingPage from "./pages/messaging/individual/individual.js";
import PreviewListingViewPage from "./pages/listings/create/preview/preview.js";
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { checkToNavigatePushNotification } from "./actions/push-notifications/push.js";
import ProposalsListPage from "./pages/proposals/list/index.js";
import IndividualProposalViewPage from "./pages/proposals/individual/individual.js";
import ActiveJobsMainPage from "./pages/activeRepairs/main/index.js";
import ViewIndividualJobPage from "./pages/activeRepairs/individual/viewJob.js";
import ManageActiveRepairPage from "./pages/activeRepairs/manage/manageActiveRepair.js";
import PaypalMenuPage from "./pages/account/payments/paypal/paypalMenu.js";
import ApprovalWebLinkPage from "./pages/activeRepairs/webViews/approvalWebLink.js";
import UserInactivity from 'react-native-user-inactivity';
import { authenticated, finishedSignup } from "./actions/signup/auth.js";
import { sendbirdLogin } from "./actions/sendbird/user.js";
import { switchAccountType } from "./actions/accountType/type.js";
import Unauthorized from "./components/unauthorized.js";
import _ from "lodash";
import OrderDetailsPaypalPaymentPage from "./pages/activeRepairs/orderDetails/details.js";
import RoadsideAssistanceLandingPage from "./pages/roadsideAssistance/main/roadsideLanding.js";
import CreateListingMainPage from "./pages/roadsideAssistance/createListing/main/index.js";
import RoadsideAssistanceAddressPage from "./pages/roadsideAssistance/createListing/create/address/address.js";
import PreviewRoadsideAssistancePage from "./pages/roadsideAssistance/createListing/create/preview/preview.js";
import CredentialsCreatePage from "./pages/roadsideAssistance/createListing/create/credentials/creds.js";
import ManageListingsRoadsideAssistancePage from "./pages/roadsideAssistance/manage/main.js";
import RoadsideAssistanceInsuranceFormPage from "./pages/roadsideAssistance/createListing/create/insurance/index.js";
import GeneralInfoRoadsideAssistanceCreatePage from "./pages/roadsideAssistance/createListing/create/general/generalInfo.js";




const Stack = createStackNavigator();

const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});



class App extends Component {
constructor(props) {
  super(props);
  
}

  getStartingPage = () => {
    console.log("this.props.finsihed", this.props.finished);
    if (this.props.finished === true) {
      return "homepage-main";
    } else {
      if (this.props.page) {
        switch (this.props.page) {
          case 1:
            return "homepage-main";
            break;
          case 2: 
            return "email-verifcation-code";
            break;
          case 3: 
            return "create-name-password";
            break;
          case 4: 
            return "create-birthday";
            break;
          case 5: 
            return "gender-selection";
            break;
          case 6: 
            return "location-create";
            break;
          case 7: 
            return "mechanic-or-client";
            break;
          case 8: 
            return "homepage-main";
            break;
          default:
            return "homepage";
            break;
        }
      } else {
        return "intro";
      }
    }
  }
  async componentDidMount () {

    const fcmToken = await messaging().getToken();

    /* Success */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Notification when app is on foreground", remoteMessage);

      Toast.show({
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
        visibilityTime: 6500,
        type: "success"
      });
    });

    /* Success */
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);

      // this.props.navigation.navigate(remoteMessage.data.dl);
      this.props.checkToNavigatePushNotification({
        redirect: true,
        route: remoteMessage.data.dl
      })
    });

    /* Success */
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
    
    GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 15000,
		})
		.then(location => {
			console.log("location :", location);

			this.props.gatherLocationOnLoad(location);
		})
		.catch(error => {
			const { code, message } = error;
			console.warn(code, message);
		})
  }
  calculateRouteLogic = () => {
    if (typeof this.props.authenticateddd !== "undefined" && this.props.authenticateddd !== null && Object.keys(this.props.authenticateddd).length > 0 && !_.has(this.props.authenticateddd, "page")) {
      return true;
    } else {
      return false;
    }
  }
  render () {
    console.log("this.props APP.js", this.props);
    return (
      <>
        <View style={{ flex: 1 }}> 
        <UserInactivity
						timeForInactivity={3600000}
						onAction={isActive => { 
							console.log("isActive", isActive); 

              if (isActive === false) {
                if (typeof this.props.authenticateddd !== 'undefined' && this.props.authenticateddd !== null && Object.keys(this.props.authenticateddd).length > 0) {
                  console.log("signout.");

                  this.props.authenticated({});
                  // this.props.finishedSignup(false);
                  this.props.sendbirdLogin({ userId: null, nickname: null });
                  this.props.switchAccountType({
                      type: "CLIENT"
                  })
                } else {
                  console.log("already logged out.");
                }
              } 
						}}
            style={{ flex: 1 }}
					>
          <NavigationContainer> 
            <Stack.Navigator screenOptions={{
                headerShown: false
              }} initialRouteName={this.getStartingPage()}>
              <Stack.Screen name="intro" component={IntroSlider} />
              <Stack.Screen name="homepage" component={SignupPageOnePage} />
              <Stack.Screen name="email-verification-code" component={VerifyCodeEmailPage} />
              <Stack.Screen name="phone-number-verification-code" component={VerfiyPhoneNumberPage} />
              <Stack.Screen name="create-name-password" component={CreateNamePasswordPage} />
              <Stack.Screen name="create-birthday" component={CreateBirthdayPage} />
              <Stack.Screen name="gender-selection" component={GenderSelectionPage} />
              <Stack.Screen name="location-create" component={LocationCreatePage} />
              <Stack.Screen name="mechanic-or-client" component={CreateAccountTypePage} />
              <Stack.Screen name="homepage-main" component={HomepageMainPage} />
              <Stack.Screen name="profile-main" component={ProfileMainPage} />
              <Stack.Screen name="personal-info" component={EditPersonalInfoPage} />
              <Stack.Screen name="sign-in" component={SigninPage} />
              <Stack.Screen name="emergency-contact-home" component={EmergencyContactHomePage} />
              <Stack.Screen name="payments-main" component={PaymentMainPage} />
              <Stack.Screen name="payments-cards" component={EditPaymentMethodsPage} />
              <Stack.Screen name="add-payment-card" component={PaymentCardAddNewPage} />
              <Stack.Screen name="create-payment" component={AddCardPage} /> 
              <Stack.Screen name="view-individual-card-info" component={IndividualCreditDebitCardPage} />
              <Stack.Screen name="credits-coupons" component={CreditsHomepagePage} />
              <Stack.Screen name="view-public-profile-page" component={ViewPublicProfilePage} />
              <Stack.Screen name="chat-conversations" component={this.calculateRouteLogic() ? MessagingConversationsPage : Unauthorized} />
              <Stack.Screen name="individual-broken-listing" component={IndividualBrokenVehiclePage} />
              <Stack.Screen name="broken-vehicles-map" component={MapViewAllListingsPage} />
              <Stack.Screen name="mechanic-for-hire-individual" component={MechanicListingPage} />
              <Stack.Screen name="providers-listing-homepage" component={HomepageListingsCreatePage} />
              <Stack.Screen name="list-vehicle-start" component={PreviewStepsBrokenVehicleListingPage} />
              <Stack.Screen name="create-vehicle-listing-one" component={PageOneVehicleFormPage} />
              <Stack.Screen name="create-vehicle-listing-two" component={LocationDetailsListVehiclePage} />
              <Stack.Screen name="create-vehicle-listing-three" component={UploadPhotosVehicleListingPage} />
              <Stack.Screen name="create-vehicle-listing-four" component={AvailablityCreationPage} />
              <Stack.Screen name="create-vehicle-listing-five" component={PricingAdjustmentPage} />
              <Stack.Screen name="notifications" component={NotificationsPage} />
              <Stack.Screen name="categories-main" component={CategoriesMainPage} />
              <Stack.Screen name="messages-individual" component={IndividualMessagingPage} />
              <Stack.Screen name="view-preview-listing-vehicle" component={PreviewListingViewPage} />
              <Stack.Screen name="proposals" component={ProposalsListPage} />
              <Stack.Screen name="proposals-individual-view" component={IndividualProposalViewPage} />
              <Stack.Screen name="active-jobs" component={this.calculateRouteLogic() ? ActiveJobsMainPage : Unauthorized} />
              <Stack.Screen name="view-individual-agreement" component={ViewIndividualJobPage} />
              <Stack.Screen name="edit-manage-listing-booked" component={ManageActiveRepairPage} />
              <Stack.Screen name="create-payment-paypal" component={PaypalMenuPage} />
              <Stack.Screen name="paypal-web-view-one" component={ApprovalWebLinkPage} />
              <Stack.Screen name="paypal-view-order-details" component={OrderDetailsPaypalPaymentPage} />
              <Stack.Screen name="roadside-assistance-main-landing" component={RoadsideAssistanceLandingPage} />
              <Stack.Screen name="advertise-roadside-assistance-main" component={CreateListingMainPage} />
              <Stack.Screen name="advertise-create-address" component={RoadsideAssistanceAddressPage} />
              <Stack.Screen name="advertise-create-address-preview" component={PreviewRoadsideAssistancePage} />
              <Stack.Screen name="roadside-assistance-create-credentials" component={CredentialsCreatePage} />
              <Stack.Screen name="roadside-assistance-display-listings" component={ManageListingsRoadsideAssistancePage} />
              <Stack.Screen name="roadside-assistance-insurance-details" component={RoadsideAssistanceInsuranceFormPage} />
              <Stack.Screen name="roadside-assistance-general-data" component={GeneralInfoRoadsideAssistanceCreatePage} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          </UserInactivity>
        </View>
      </>
    );
 }
};
const mapStateToProps = (state) => {
  console.log("STATE!!!!:", state);
  if (typeof state.auth.authenticated !== "undefined") {
    if (Object.keys(state.auth.authenticated).length === 0) {
        return {
          finished: state.auth.finished,
          unique_id: null,
          authenticateddd: null
        }
    } else {
        return {
          page: state.auth.authenticated.page,
          finished: state.auth.finished,
          unique_id: state.auth.authenticated.unique_id,
          authenticateddd: state.auth.authenticated
        }
    } 
  } else {
    return {
      unique_id: null,
      authenticateddd: null
    }
  }
}
export default connect(mapStateToProps, { gatherLocationOnLoad, switchAccountType, checkToNavigatePushNotification, authenticated, finishedSignup, sendbirdLogin })(App);