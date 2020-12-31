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

const Stack = createStackNavigator();

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
  componentDidMount() {
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
  render () {
    return (
      <>
        <View style={{ flex: 1 }}> 
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
              <Stack.Screen name="chat-conversations" component={MessagingConversationsPage} />
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
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </>
    );
 }
};
const mapStateToProps = state => {
  if (typeof state.auth.authenticated !== "undefined") {
    if (Object.keys(state.auth.authenticated).length === 0) {
        return {
          finished: false
        }
    } else {
        return {
          page: state.auth.authenticated.page,
          finished: state.auth.finished
        }
    } 
  } else {
    return {

    }
  }
}
export default connect(mapStateToProps, { gatherLocationOnLoad })(App);