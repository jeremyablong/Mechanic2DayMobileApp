const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const router = express.Router();
// init middleware
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoDB = require("./config/db.js");
const path = require("path");

const PORT = process.env.PORT || 5000;

mongoDB();

app.options('*', cors());
app.use('*', cors());
app.use(cors());

app.use(bodyParser.urlencoded({
  limit: "500mb",
  extended: false
}));
app.use(bodyParser.json({
	limit: "500mb"
}));

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

app.listen(PORT, () => {
	console.log(`App is listening at port ${PORT}`)	
})