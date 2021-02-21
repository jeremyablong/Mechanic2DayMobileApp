const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const router = express.Router();
// init middleware
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoDB = require("./config/db.js");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	}
});
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
// blockchain stuff - start
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const rp = require("request-promise"); 
const { v4: uuidv4 } = require('uuid');
const nodeAddress = uuidv4().split("-").join("");
const config = require("config");
const axios = require('axios');
// blockchain stuff - end

const PORT = process.env.PORT || 5000;

mongoDB();

app.options('*', cors());
app.use('*', cors());
app.use(cors());

const maybe = (fn) => {
    return function(req, res, next) {
        if (req.path === '/webhook') {
            next();
        } else {
            fn(req, res, next);
        }
    }
}
app.use(maybe(bodyParser.json({
	limit: "500mb"
})));
app.use(maybe(bodyParser.urlencoded({
	limit: "500mb",
	extended: false
})));

const limiter = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000 * 1000, // remove the last 1000 for production
    message: 'Too many requests' // message to send
});

app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);

app.use("/webhook", require("./routes/webhook/stripe/main.js"));
app.use("/register/user/customer", require("./routes/auth/registerCustomer.js"));
app.use("/send/confirmation/email", require("./routes/auth/verifcationEmail.js"));
app.use("/check/email/code", require("./routes/auth/checkEmailCode.js"));
app.use("/send/confirmation/phone", require("./routes/auth/phone/sendPhoneVerifcation.js"));
app.use("/validate/phone/number/code", require("./routes/auth/phone/verifyCode.js"));
app.use("/register/user", require("./routes/auth/register.js"));
app.use("/resend/code/auth", require("./routes/auth/phone/resendAuthCode.js"));
app.use("/gather/general/info", require("./routes/account/general/gatherInfoGeneral.js"));
app.use("/sign-in", require("./routes/auth/signin/signin.js"));
app.use("/add/phone/number", require("./routes/account/personalInfo/addPhoneNumber.js"));
app.use("/send/code/new/phone/number", require("./routes/account/personalInfo/phone/sendVerifcationCode.js"));
app.use("/update/email", require("./routes/account/personalInfo/email/update.js"));
app.use("/check/code/second/validate", require("./routes/account/personalInfo/phone/verifySecondValidation.js"));
app.use("/save/data/general", require("./routes/account/personalInfo/general/saveGeneralInfo.js"));
app.use("/add/card/payments", require("./routes/account/payments/payments/create/createPayment.js"));
app.use("/gather/credit/debit/cards", require("./routes/account/payments/payments/gather/gatherCards.js"));
app.use("/edit/card/individual", require("./routes/account/payments/payments/changes/deleteCard.js"));
app.use("/update/payment/primary", require("./routes/account/payments/payments/changes/makeCardPrimary.js"));
app.use("/save/oauth/google/user", require("./routes/auth/googleRegister.js"));
app.use("/save/details/personal/info/editted", require("./routes/account/personalInfo/general/aboutMeDetails.js"));
app.use("/add/new/information/vehicle/listing/page/one", require("./routes/clients/postNew/initial/postNewVehicle.js"));
app.use("/gather/listing/specific/vehicle/listing", require("./routes/clients/gather/gatherSpecificListingVehicle.js"));
app.use("/add/new/data/vehicle/listing/two", require("./routes/clients/postNew/locationDetails/locationAndDesc.js"));
app.use("/post/pictures/listing/vehicle/signup", require("./routes/clients/postNew/photos/uploadPhotosBrokenVehicle.js"));
app.use("/update/days/avaliable/list/vehicle", require("./routes/clients/postNew/avaliableDays/addNewOpenDays.js"));
app.use("/finale/post/broken/vehicle/make/live", require("./routes/clients/postNew/makeLive/makeVehicleListingLive.js"));
app.use("/delete/listing/broken/vehicle", require("./routes/clients/delete/deleteVehicleListing.js"));
app.use("/gather/live/listings/vehicles", require("./routes/clients/gather/gatherVehicles.js"));
app.use("/gather/specific/listing/vehicle/posting", require("./routes/clients/gather/getVehicleListing.js"));
app.use("/gather/listing/by/poster/id", require("./routes/clients/gather/gatherUserById.js"));
app.use("/create/channel/send/message", require("./routes/messaging/initiate/openChannelSendMessage.js"));
app.use("/gather/conversations/sendbird", require("./routes/messaging/gather/gatherConversations.js"));
app.use("/gather/individual/thread", require("./routes/messaging/individual/gatherMessageThread.js"));
app.use("/gather/category/listings", require("./routes/categories/gather/getCategoryListings.js"));
app.use("/update/location/listing/edit", require("./routes/clients/edit/update/saveNewLocationEdit.js"));
app.use("/update/location/listing/edit/manual/entry", require("./routes/clients/edit/update/manualLocationEdit.js"));
app.use("/edit/listing/primary/settings", require("./routes/clients/edit/update/updatePrimaryData.js"));
app.use("/save/firebase/push/token", require("./routes/push-notifications/saveTokenUponLoad.js"));
app.use("/place/bid/proposal/vehicle/listing", require("./routes/clients/proposals/submit/submitProposal.js"));
app.use("/gather/proposals/list", require("./routes/proposals/gatherProposals/index.js"));
app.use("/gather/breif/data", require("./routes/gatherRestrctedUserData.js"));
app.use("/find/related/post/by/id", require("./routes/proposals/individual/gatherRelatedPostInfo.js"));
app.use("/reject/proposal/vehicle/listing", require("./routes/proposals/reject/rejectProposal.js"));
app.use("/accept/proposal/vehicle/listing", require(("./routes/proposals/accept/acceptProposal.js")));
app.use("/accept/proposal/individual", require("./routes/proposals/accept/notifyUserOfAcceptance.js"));
app.use("/denial/proposal/all/other/users", require("./routes/proposals/denial/denyProposal.js"));
app.use("/notify/user/of/denial", require("./routes/proposals/reject/notifiyUserOfDenial.js"));
app.use("/gather/active/jobs", require("./routes/activeJobs/gatherActiveJobs.js"));
app.use("/gather/notifications", require("./routes/notifications/index.js"));
app.use("/gather/breif/data/two", require("./routes/gatherRestrictedDataTwo.js"));
app.use("/delete/notification", require("./routes/notifications/delete/deleteNotification.js"));
app.use("/gather/accepted_jobs/details", require("./routes/activeJobs/gather/gatherJobs.js"));
app.use("/gather/applied/information", require("./routes/activeJobs/gather/gatherApplicationDetails.js"));
app.use("/initiate/payment/paypal/3/step", require("./routes/stripe/createOrderDelayed.js"));
app.use("/update/payments/with/paypal/address", require("./routes/account/payments/payments/create/addPaypalEmailAddress.js"));
app.use("/delete/paypal/account/email", require("./routes/account/payments/payments/changes/deletePaypalEmailAddress.js"));
app.use("/capture/paypal/payment/second/step", require("./routes/stripe/capturePayment.js"));
app.use("/notify/push/notification/email/paypal/other", require("./routes/push-notifications/paypalRelated/notifyOtherRegEmail.js"));
app.use("/finalize/payment/paypal/vehicle/repair", require("./routes/stripe/finalizePaymentHalf.js"));
app.use("/accept/job/quality/work/lister", require("./routes/stripe/acceptOtherHalf.js"));
app.use("/start/listing/location/roadside/assistance", require("./routes/roadsideAssistance/create/createListingLocation.js"));
app.use("/gather/listings/roadside/assistance", require("./routes/roadsideAssistance/gather/gatherUnfinishedListings.js"));
app.use("/update/listing/drivers/license/info/roadside/assistance", require("./routes/roadsideAssistance/create/DLinfo.js"));
app.use("/save/insurance/info/roadside/assistance", require("./routes/roadsideAssistance/create/insuranceInfo.js"));
app.use("/update/listing/roadside/assistance/general/details", require("./routes/roadsideAssistance/create/generalDetails.js"));
app.use("/update/pricing/services/roadside/assistance", require("./routes/roadsideAssistance/create/pricing.js"));
app.use("/submit/vehicle/details/roadside/assistance", require("./routes/roadsideAssistance/create/vehicleDetails.js"));
app.use("/gather/roadside/assistance/listings", require("./routes/roadsideAssistance/gather/gatherListingsAll.js"));
app.use("/update/location/geo", require("./routes/location/updateUserLocation.js"));
app.use("/gather/mechanics", require("./routes/mechanics/gatherAllMechanics.js"));
app.use("/start/tow/service/start/finish", require("./routes/roadsideAssistance/towTransaction/startTowActiveOne.js"));
app.use("/start/tow/service/start/finish/two", require("./routes/roadsideAssistance/towTransaction/startTowActiveTwo.js"));
app.use("/take/payment/paypal/capture", require("./routes/stripe/tow/takePaymentInitial.js"));
app.use("/gather/all/companies/display/tow", require("./routes/towCompanies/gatherAllTowCompanies.js"));
app.use("/associate/and/notify/tow/company", require("./routes/towCompanies/newDriver/newDriverRequest.js"));
app.use("/gather/tow/drivers/pending", require("./routes/towCompanies/newDriver/gatherPendingDrivers.js"));
app.use("/approve/driver/for/team", require("./routes/towCompanies/newDriver/approveDriver.js"));
app.use("/intiate/tow/add/to/queue", require("./routes/roadsideAssistance/initiate/startTowAndAddToQueue.js"));
app.use("/add/to/queue", require("./routes/roadsideAssistance/initiate/addToQueue.js"));
app.use("/gather/requested/tow/information", require("./routes/roadsideAssistance/queue/gatherRequestInfo.js"));
app.use("/gather/queued/jobs", require("./routes/roadsideAssistance/queue/gatherQueuedJobs.js"));
app.use("/assign/driver/roadside/assistance", require("./routes/roadsideAssistance/towTransaction/assignDriverAndNotify.js"));
app.use("/update/both/users/start/tow", require("./routes/roadsideAssistance/towTransaction/startTow.js"));
app.use("/gather/user/location/in/transit", require("./routes/roadsideAssistance/active/snagLocationTowTruckTransit.js"));
app.use("/notifiy/of/arrival/tow/driver", require("./routes/towDrivers/notify/notifyOtherUserArrival.js"));
app.use("/notify/other/user/arrival/tow", require("./routes/towDrivers/notify/notifyUser.js"));
app.use("/second/step/confirm/drivers/arrival", require("./routes/roadsideAssistance/active/confirmDriversArrival.js"));
app.use("/gather/breif/data/two/custom", require("./routes/roadsideAssistance/active/gatherRestrictedUserDataThree.js"));
app.use("/gather/co/information", require("./routes/roadsideAssistance/active/gatherCoInfo.js"));
app.use("/notify/business/activate/account", require("./routes/towDrivers/notify/notifiyEmployerActivate.js"));
app.use("/associate/with/tow/truck/company", require("./routes/towDrivers/associate/associateWithCo.js"));
app.use("/associate/user/tow/company/send/request", require("./routes/towCompanies/newDriver/associateDriverRequest.js"));
app.use("/mark/tow/driver/trip/complete", require("./routes/towDrivers/complete/markTripAsComplete.js"));
app.use("/mark/trip/complete/finale/half/one", require("./routes/roadsideAssistance/completeTrip/completeClientHalf.js"));
app.use("/mark/trip/complete/finale/half/two/agent", require("./routes/roadsideAssistance/completeTrip/completeTripAgent.js"));
app.use("/submit/feedback/review/agent", require("./routes/roadsideAssistance/review/submitReviewAgent.js"));
app.use("/submit/feedback/review/client", require("./routes/towDrivers/review/reviewClientRoadsideJob.js"));
app.use("/gather/tow/company/information/prices", require("./routes/towDrivers/requestCompanyData/requestData.js"));
app.use("/start/active/job/roadside/assistance/accepted/proposal", require("./routes/roadsideAssistance/initiate/startJobRoadsideAssistanceConfirmed.js"));
app.use("/remove/queued/item", require("./routes/roadsideAssistance/towTransaction/removeFromQueue.js"));
app.use("/gather/company/related/information", require("./routes/roadsideAssistance/initiate/gatherCoAssociated.js"));
app.use("/onboarding/stripe", require("./routes/account/verification/verifyInitiate.js"));
app.use("/mark/stripe/onboarding/complete", require("./routes/account/verification/markComplete.js"));
app.use("/make/applied", require("./routes/roadsideAssistance/initiate/markApplied.js"));
app.use("/decline/roadside/assistance/offer", require("./routes/roadsideAssistance/initiate/declineOffer.js"));
app.use("/check/if/able/to/apply", require("./routes/towDrivers/initiate/checkPendingJob.js"));
app.use("/cancel/roadside/assistance/claim", require("./routes/roadsideAssistance/delete/deleteListingRequest.js"));
app.use("/remove/from/queue", require("./routes/roadsideAssistance/delete/removeFromQueue.js"));
app.use("/mark/complete/broken/vehicle/listing/mechanic/user", require("./routes/brokenVehicleListings/completion/mechanic/markAsComplete.js"));
app.use("/mark/complete/broken/vehicle/listing/client/user", require("./routes/brokenVehicleListings/completion/client/markAsComplete.js"));
app.use("/submit/feedback/review/client/broken/vehicle/listing", require("./routes/activeJobs/reviews/client/review.js"));
app.use("/submit/feedback/review/mechanic/broken/vehicle", require("./routes/activeJobs/reviews/mechanic/review.js"));
app.use("/remove/broken/vehicle/listing", require("./routes/brokenVehicleListings/removeListing.js"));
app.use("/upload/individual/photo/on/select", require("./routes/clients/postNew/photos/uploadIndividual.js"));
// gather all mechanics generally speaking
app.use("/gather/mechanics/all", require("./routes/homepage/gatherAllMechanics.js"));
// gather all mechanics ^^^^^^^
app.use("/gather/general/info/with/balance", require("./routes/account/general/generalAccountInfoAndBalance.js"));
app.use("/list/all/payouts", require("./routes/account/payments/payouts/listAll/listAllPayoutMethods.js"));
app.use("/create/new/payout/bank/account/information", require("./routes/account/payments/payouts/create/craeteNewBankAccountAdd.js"));
app.use("/cashout/payout/instant", require("./routes/account/payments/payouts/cashout/cashout.js"));
app.use("/gather/past/payouts", require("./routes/account/payments/payouts/gatherAllPayouts/gatherPastPayouts.js"));
app.use("/successful/boost/purchase/tow/company", require("./routes/boost/successfulTowCompanyBoost.js"));
app.use("/promote/driver/temp", require("./routes/boost/drivers/promoteDriver.js"));
app.use("/gather/towtruck/drivers/promoted", require("./routes/promoted/towDrivers/promotedTowDriverProfiles.js"));
app.use("/successful/boost/purchase/mechanic/listing", require("./routes/boost/successfulMechanicBoost.js"));
app.use("/check/pending/boosted/profile/mechanic", require("./routes/boost/mechanic/boostMechanic.js"));
app.use("/gather/mechanics/promoted/all", require("./routes/promoted/mechanics/promotedMechanicProfiles.js"));
app.use("/submit/general/feedback/company", require("./routes/account/feedback/submitCriticalFeedback.js"));
app.use("/check/balance/cryptocurrency", require("./routes/blockchain/checkBalance/check.js"));
app.use("/boost/mechanic/using/existing/boost", require("./routes/boost/existing/mechanic/boostUsingExisting.js"));
app.use("/boost/tow/driver/using/existing/boost", require("./routes/boost/existing/drivers/boostUsingExisting.js"));
app.use("/promote/driver/temp/checked", require("./routes/boost/existing/drivers/checkedAndAdded.js"));
app.use("/start/roadside/assistance/claim/two", require("./routes/roadsideAssistance/initiate/startRoadsideAssistanceTwo.js"));
app.use("/gather/associated/company/rates", require("./routes/towDrivers/sendTowRates.js"));
app.use("/notifiy/of/arrival/tow/driver/no-tow", require("./routes/towDrivers/notify/noTow.js"));
app.use("/second/step/confirm/drivers/arrival/no-tow", require("./routes/roadsideAssistance/active/confirmDriverArrivalNoTow.js"));
app.use("/complete/no-tow/roadside/assistance/job", require("./routes/roadsideAssistance/completeTrip/noTowComplete/noTowCompleteClient.js"));
app.use("/complete/no-tow/roadside/assistance/job/agent", require("./routes/towDrivers/noTowComplete/noTowCompleteAgent.js"));

app.get('*', function(req, res) {
  res.sendFile(__dirname, './client/public/index.html')
})

app.get('*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
	  if (err) {
		res.status(500).send(err)
	  };
	};
});

app.get('/*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		};
	};
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if it doenst recognize the route
	app.get('*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		}
	}
	})
	app.get('/*', cors(), function(_, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		}
	})
	})
}; 


io.on("connection", socket => {

	console.log("New client connected");

	socket.on("approved-driver-arrival", (data) => {

		console.log("JACKPOT!:", data);

		io.sockets.emit("arrived", data);

	})
	socket.on("successfully-completed-repair", (data) => {

		console.log("COMPLETED REPAIR CLIENT!:", data);

		io.sockets.emit("completed-repair-client", data);

	})
	socket.on("completed-repair-mechanic-review", (data) => {
		console.log("COMPLETED REPAIR MECHANIC!:", data);

		io.sockets.emit("completed-repair-mechanic", data);
	})
	socket.on("notify-other-user-of-completion", (data) => {
		console.log("NOTIFY OF HALF COMPLETION!:", data);

		io.sockets.emit("completed-partial", data);
	})
	socket.on("approve-next-page", (data) => {

		console.log("fire sockets one!!!", data);

		io.sockets.emit("fire-off", data);
	})
	socket.on("approve-next-page-no-tow", (data) => {
		console.log("approve-next-page-no-tow", data);

		io.sockets.emit("no-tow-end", data);
	})
	socket.on("mark-trip-complete", (data) => {

		console.log("JACKPOT THREE!:", data);

		io.sockets.emit("complete", data);
	})
	socket.on("handle-redirection", (data) => {
		console.log("majgggggicccccc", data);

		io.sockets.emit("redirect", data);
	})
	socket.on("handle-redirection-agent", (data) => {
		console.log("majgggggicccccc FOURRRRRR", data);

		io.sockets.emit("redirect-agent", data);
	})
	socket.on("delivered-successfully", (data) => {

		console.log("JACKPOT TWO DELIVERED!:", data);

		io.sockets.emit("delivered", data);
	});
	socket.on("started-active-tow", (data) => {

		console.log("JACKPOT TWO DELIVERED!:", data);

		io.sockets.emit("start", data);
	});
	socket.on("started-active-tow-personalized", (data) => {

		console.log("JACKPOT TWO DELIVERED!:", data);

		io.sockets.emit("start-personalized", data);
	});
	socket.on("send-invitation-request", (data) => {

		console.log("INVITE DELIVERED!:", data);

		io.sockets.emit("invite", data);
	});
	socket.on("start-roadside-assistance-specific-agent", (data) => {

		console.log("INITIATE SPECIFIC ROADSIDE AGENT!:", data);

		io.sockets.emit("start-specific-tow", data);
	});
	socket.on("send-tow-rates", (data) => {

		console.log("INITIATE SPECIFIC ROADSIDE AGENT!:", data);

		io.sockets.emit("tow-rates", data);
	});
	socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});