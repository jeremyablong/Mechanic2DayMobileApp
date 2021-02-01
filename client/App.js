import React, { Component, Fragment } from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from "axios";
import { navigationRef } from "./RootNavigation.js";
import { Config } from "react-native-config";
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
import PricingRoadsideAssistanceListingPage from "./pages/roadsideAssistance/createListing/create/pricing/pricing.js";
import TowVehicleDetailsRoadsideAssistancePage from "./pages/roadsideAssistance/createListing/create/towTruckInfo/towVehicle.js";
import BackgroundGeolocation from "react-native-background-geolocation";
import StartTwoServicesOnePage from "./pages/roadsideAssistance/initiateTow/startTow/startOne.js";
import AssociateDriverPage from "./pages/signup/associate/associateDriver.js";
import TowCompanyManageDriversPage from "./pages/towCompany/manage/index.js";
import WaitingRoomRoadsideAssistancePage from "./pages/roadsideAssistance/initiateTow/waitingRoom/wait.js";
import TowTruckDriverHomepagePage from "./pages/towTruckDriver/homepage/index.js";
import ListQueuePage from "./pages/towTruckDriver/listQueue/listQueue.js";
import ManageActiveJobClaimPage from "./pages/towTruckDriver/activeClaim/active.js";
import ActiveProposalRoadsideAssistanceInProgressPage from "./pages/roadsideAssistance/active/activeClaim.js";
import IndividualListingTowCompanyPage from "./pages/roadsideAssistance/individual/index.js";
import ManageActiveJobRoadsideAssistanceManageJobPage from "./pages/towTruckDriver/manage/manageActiveJob.js";
import ManageUponArrivalDeparturePage from "./pages/roadsideAssistance/manage/manageUponArrival/manageUponArrival.js";
import AssociateWithTowCompanyPage from "./pages/towTruckDriver/associateTowCo/associate.js";
import Modal from 'react-native-modal';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import ReviewRoadsideAssistanceAgentPage from "./pages/roadsideAssistance/review/reviewRoadsideAgent/review.js";
import ReviewRoadsideAssistanceClientPage from "./pages/towTruckDriver/reviewClient/reviewClient.js";
import SubscriptionPlansSelectionPage from "./pages/signup/subscriptionPlans/subscription.js";
import RBSheet from "react-native-raw-bottom-sheet";



const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});


class App extends Component {
constructor(props) {
  super(props);
  

  this.state = {
    count: 0,
    showModalOne: false,
    interval: 0,
    company_informtion: null,
    selected: null,
    fullName: "",
    ready: false,
    price: 0,
    lengthInMeters: 0,
    tow_driver_id: ""
  }
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
  handleWalkingUpdate = (location) => {
    console.log("walking", location);
  }
  handleDrivingLocationUpdate = (location) => {
    console.log("handleDrivingLocationUpdate", location);

    axios.post(`${Config.ngrok_url}/update/location/geo`, {
      id: this.props.unique_id,
      location
    }).then((res) => {
      if (res.data.message === "Successfully updated location") {
        console.log(res.data);

        this.setState({
          count: 0
        })
      } else {
        console.log("err", res.data);
        this.setState({
          count: 0
        })
      }
    }).catch((err) => {
      console.log(err);

      this.setState({
        count: 0
      })
    })

    if (this.state.count >= 10) {
      this.setState({
        count: 0
      })
    }
  }
  //  componentWillUnmount() {
  //     BackgroundGeolocation.removeListeners();
  // }
  onLocation = (location) => {
    console.log('[location] -', location);

    console.log(location.coords.speed);

    if (this.props.unique_id !== null) {
      this.setState((prevState, props) => ({
        count: prevState.count + 1
      }), () => {
        if (this.state.count >= 10) {
          this.setState({
            count: 0
          })
        } else {
          if (location.coords.speed < 4) {
            // run only every 12 cycles
            console.log("run only every 4 cycles")
            if (this.state.count === 4) {
              this.handleDrivingLocationUpdate(location);
            }
          } else if (4 <= location.coords.speed && location.coords.speed <= 9) {
            // run only every 9 cycles
              console.log("run only every 5 cycles")
            if (this.state.count === 5) {
              this.handleDrivingLocationUpdate(location);
            }
          } else if (10 <= location.coords.speed && location.coords.speed <= 15) {
            console.log("run only every 6 cycles")
            if (this.state.count === 6) {
              this.handleDrivingLocationUpdate(location);
            }
            // run only every 8 cycles
          } else if (16 <= location.coords.speed && location.coords.speed <= 25) {
            console.log("run only every 7 cycles")
            // run only every 6 cycles
            if (this.state.count === 7) {
              this.handleDrivingLocationUpdate(location);
            }
          } else {
            console.log("run only every 8 cycles", this.state.count);
    
            if (this.state.count === 8) {
              this.handleDrivingLocationUpdate(location);
            }
            // run only every 4 cycles
          }
        }
      });
    }
  }
  onError = (error) => {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange = (event) => {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'

    switch (event.activity) {
      case "still": 
        // do nothing
        this.setState({
          interval: 0
        })
        break;
      case "on_foot":
        this.setState({
          interval: 8
        })
        break;
      case "in_vehicle": 
        this.setState({
          interval: 4
        })
      default:
        break;
    }
  }
  onProviderChange = (provider) => {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange = (event) => {
    console.log('[motionchange] -', event.isMoving, event.location);
  }
  async componentDidMount () {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });

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
  
  renderSockets = () => {
    socket.on("delivered", (data) => {
        if (data.delivered === true && data.user_id === this.props.unique_id) {

            console.log("delivered!!!!!");

            this.setState({
              showModalOne: true
            })
        }
    })
    socket.on("arrived", (data) => {
      if (data.approved === true && data.user_id === this.props.unique_id) {

          console.log("approved!!!!!");

          this.navigationRef.navigate("settings-active-roadside-assistance-manage");
      }
    })
    socket.on("complete", (data) => {
      if (data.complete === true && data.user_id === this.props.unique_id) {

          console.log("completed!!!!!");

          this.setState({
            showModalTwo: true
          })
      }
  })
  socket.on("redirect", (data) => {
    if (data.redirect === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("review-roadside-assistance-client", null);
    }
  })
  socket.on("redirect-agent", (data) => {
    if (data.redirect === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("review-roadside-assistance-agent", null);
    }
  })
  socket.on("start", (data) => {
    if (data.started === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("tow-activated-map-view", null);
    }
  })
  socket.on("invite", (data) => {
    if (data.user_id === this.props.unique_id) {
      console.log("data data data", data);

      setTimeout(() => {
        this.setState({
          selected: data.selected,
          fullName: data.fullName,
          lengthInMeters: data.lengthInMeters,
          company_informtion: data.company_informtion,
          tow_driver_id: data.tow_driver_id,
          showProposalModal: true,
          ready: true
        })
      }, 2000);
    }
  })
  socket.on("fire-off", (data) => {
    if (data.approved === true && data.user_id === this.props.unique_id) {
      this.navigationRef.navigate("driver-has-arrived-manage-listing-depatarture", null);
    }
  })
}
  calculateReadiness = () => {
    const { ready } = this.state;
    
    if (ready === true) {
      return true;
    } else {
      return false;
    }
  }
  renderModalContent = () => {
    const { selected, company_informtion } = this.state;

    if (selected.tow_required === false) {
      switch (selected.roadside_service_required) {
          case "door-unlocking":
              return (
                <Fragment>
                  <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.unlock_locked_door_cost}</Text>
                </Fragment>
              );
              break;
          case "gas-delivery":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.gas_delivery_cost}</Text>
              </Fragment>
            );
            break;
          case "tire-change": 
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.change_tire_cost}</Text>
              </Fragment>
            );
            break;
          case "stuck-vehicle":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.remove_stuck_vehicle}</Text>
              </Fragment>
            );
            break;
          case "jump-start":
            return (
              <Fragment>
                <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.services.jumpstart_cost}</Text>
              </Fragment>
            );
            break;
          default:
              break;
      }
    } else {
      return (
        <Fragment>
          <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${company_informtion.standard_tow_fees.tow_price} flat rate</Text>
          <Text style={{ textAlign: "center" }}>+ Plus +</Text>
          <Text style={{ fontWeight: "bold", color: "darkred", textAlign: "center", fontSize: 24 }}>${((this.state.lengthInMeters / 1609.34) * company_informtion.standard_tow_fees.per_mile_fee).toFixed(2)} in milage</Text>
        </Fragment>
      );
    }
  }
  handleRedirectAndProcessPriceCalc = () => {
    const { lengthInMeters, company_informtion, selected, fullName, tow_driver_id } = this.state;

    console.log("handleRedirectAndProcessPriceCalc clicked");

    axios.post(`${Config.ngrok_url}/start/active/job/roadside/assistance/accepted/proposal`, {
      length_in_meters: lengthInMeters,
      company_informtion,
      selected,
      fullName,
      tow_driver_id,
      client_id: this.props.unique_id
    }).then((res) => {
      if (res.data.message === "Successfully executed logic!") {
        console.log(res.data);

        socket.emit("started-active-tow", {
            started: true,
            user_id: tow_driver_id
        })

        setTimeout(() => {
          this.navigationRef.navigate("in-progress-roadside-assistance");
        }, 1000)
      } else {
        console.log(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render () {
    console.log("this.state APP.js", this.state);
    const { selected, company_informtion } = this.state;
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
          <NavigationContainer ref={(ref) => this.navigationRef = ref}> 
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
              <Stack.Screen name="roadside-assistance-pricing" component={PricingRoadsideAssistanceListingPage} />
              <Stack.Screen name="roadside-assistance-vehicle-information-tow" component={TowVehicleDetailsRoadsideAssistancePage} />
              <Stack.Screen name="initialize-tow-two" component={StartTwoServicesOnePage} />
              <Stack.Screen name="associate-to-tow-company" component={AssociateDriverPage} />
              <Stack.Screen name="manage-tow-drivers" component={TowCompanyManageDriversPage} />
              <Stack.Screen name="waiting-room-roadside-assistance" component={WaitingRoomRoadsideAssistancePage} />
              <Stack.Screen name="tow-truck-driver-online-homepage" component={TowTruckDriverHomepagePage} />
              <Stack.Screen name="list-roadside-assistance-queue" component={ListQueuePage} />
              <Stack.Screen name="tow-activated-map-view" component={ManageActiveJobClaimPage} />
              <Stack.Screen name="in-progress-roadside-assistance" component={ActiveProposalRoadsideAssistanceInProgressPage} />
              <Stack.Screen name="individual-listing-tow-company" component={IndividualListingTowCompanyPage} />
              <Stack.Screen name="settings-active-roadside-assistance-manage" component={ManageActiveJobRoadsideAssistanceManageJobPage} />
              <Stack.Screen name="driver-has-arrived-manage-listing-depatarture" component={ManageUponArrivalDeparturePage} />
              <Stack.Screen name="associate-with-tow-company" component={AssociateWithTowCompanyPage} />
              <Stack.Screen name="review-roadside-assistance-agent" component={ReviewRoadsideAssistanceAgentPage} />
              <Stack.Screen name="review-roadside-assistance-client" component={ReviewRoadsideAssistanceClientPage} />
              <Stack.Screen name="mechanic-select-pricing-plan" component={SubscriptionPlansSelectionPage} />
            </Stack.Navigator>
          </NavigationContainer>
          {this.calculateReadiness() ? <Modal isVisible={this.state.showProposalModal}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: height - 25, minHeight: height - 25, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, maxWidth: width * 0.85 }} style={{ borderWidth: 2, borderColor: "darkgrey", marginBottom: 25 }}>
              <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                       You have a new offer from {company_informtion.company_name}
                    </Text>
                </View>

                <View style={styles.postContent}>
                    <Text style={styles.postTitle}>
                        Services Fee's - Specific Tasks
                    </Text>

                    <Text style={styles.postDescription}>
                        Changing a tire: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.change_tire_cost}{"\n"}</Text>
                        Gas Delivery: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.gas_delivery_cost}{"\n"}</Text>
                        Jumpstart: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.jumpstart_cost}{"\n"}</Text>
                        Remove Stuck Vehicle: <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.remove_stuck_vehicle}{"\n"}</Text>
                        Unlock Door(s): <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{company_informtion.services.unlock_locked_door_cost}{"\n"}</Text>
                    </Text>
                    <View style={styles.hr} />
                    <Text style={styles.postTitle}>
                        Standard Flat Rate {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${company_informtion.standard_tow_fees.tow_price.toString()}</Text>
                    </Text>
                    <View style={styles.hr} />
                    <Text style={styles.postTitle}>
                        Price Per Mile {"\n"}<Text style={{ color: "darkblue", fontWeight: "bold" }}>${company_informtion.standard_tow_fees.per_mile_fee.toString()}</Text> 
                    </Text>
                    <View style={styles.hr} />

                    <Text style={styles.date}>
                      Joined {company_informtion.date}
                    </Text>

                    <View style={styles.profile}>
                      <Image style={styles.avatar}
                        source={{uri: company_informtion.company_image }}/>

                      <Text style={styles.name}>
                          <Text style={{ textDecorationLine: "underline" }}>Driver</Text> {"\n"}{this.state.fullName}
                      </Text>
                    </View>
                    <View style={styles.hr} />
                      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>You'll pay....</Text>
                      {this.renderModalContent()}
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"primary"} textColor={"white"} stretch={true} onPress={() => {
                      this.setState({
                        showProposalModal: false,
                        ready: false
                      }, () => {
                        this.handleRedirectAndProcessPriceCalc();
                      })
                    }}>Accept Offer & Redirect</AwesomeButtonBlue>
                </View>
              </View>
            </ScrollView>
            <AwesomeButtonBlue type={"secondary"} width={width * 0.75} onPress={() => {
              this.setState({
                showProposalModal: false,
                ready: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
          </View>
        </Modal> : null}
          {this.renderSockets()}
          <Modal isVisible={this.state.showModalOne}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: 500, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <Image source={require("./assets/icons/gps-2.png")} style={{ maxWidth: 75, maxHeight: 75 }} />
            <Text style={{ marginBottom: 25, fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 15 }}>You roadside assistance agent marked your trip as complete! Please verify and confirm this change.</Text>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"secondary"} width={width * 0.75} onPress={() => {
              this.setState({
                showModalOne: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {
              this.setState({
                showModalOne: false
              }, () => {
                this.navigationRef.navigate('driver-has-arrived-manage-listing-depatarture', null);
              })
            }} width={width * 0.75}>Redirect to page</AwesomeButtonBlue>
          </View>
        </Modal>
        <Modal isVisible={this.state.showModalTwo}>
          <View style={{ flex: 1, backgroundColor: "white", width: width * 0.90, maxHeight: 500, justifyContent: "center", alignItems: "center", alignContent: "center", padding: 20 }}>
            <Image source={require("./assets/icons/completed.png")} style={{ maxWidth: 75, maxHeight: 75 }} />
            <Text style={{ marginBottom: 25, fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 15 }}>The agent for the roadside assistance/tow job you're actively assigned to marked the trip as "complete". Please confirm on your half to finish and finalize the trip! You can find these actions in the "roadside assistance" section of this app...</Text>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"secondary"} width={width * 0.75} onPress={() => {
              this.setState({
                showModalTwo: false
              })
            }} textColor={"black"}>Close/exit</AwesomeButtonBlue>
            <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 2, marginBottom: 15, marginTop: 15 }} />
            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {
              this.setState({
                showModalTwo: false
              }, () => {
                this.navigationRef.navigate('driver-has-arrived-manage-listing-depatarture', null);
              })
            }} width={width * 0.75}>Redirect to page</AwesomeButtonBlue>
          </View>
        </Modal>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          </UserInactivity>
        </View> 
      </>
    );
 }
};
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:30,
    alignItems: 'center',
    backgroundColor: "darkblue",
  },
  headerTitle:{
    fontSize:30,
    color:"white",
    fontWeight:'bold',
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"darkblue",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
  },
  postDescription:{
    fontSize:20,
    marginTop:10,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 4,
    borderColor: "darkblue",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  hr: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    marginTop: 15, 
    marginBottom: 15 
  },
  shareButtonText:{
    color: "darkblue",
    fontSize:20,
  }
});
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