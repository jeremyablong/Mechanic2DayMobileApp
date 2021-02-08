const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));
const bodyParser = require("body-parser");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", bodyParser.raw({type: 'application/json'}), (request, response) => {

        let event;

        console.log(request.body);

        try {
            event = JSON.parse(request.body);

            // Handle the event and SEND AN EMAIL WHEN CHANGE OCCURS
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    console.log("payment_intent.succeeded", paymentIntent);
                    break;
                case 'payment_method.attached':
                    const paymentMethod = event.data.object;
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                    console.log("payment_method.attached", paymentMethod);
                    break;
                // ... handle other event types
                case 'payment_intent.created': 
                    const paymentMethodCreated = event.data.object;

                    console.log("'payment_intent.created'", paymentMethodCreated);
                    break;
                case 'account.updated': 
                    const accountUpdatedEvent = event.data.object;

                    console.log("account.updated", accountUpdatedEvent);
                    break;
                case 'balance.available':   
                    const balanceAvaliableEvent = event.data.object;

                    console.log("balance.available", balanceAvaliableEvent);
                    break;
                case 'charge.captured':   
                    const chargeCapturedEvent = event.data.object;

                    console.log("charge.captured", chargeCapturedEvent);
                    break;
                case 'charge.succeeded': 
                    const chargeSucceededEvent = event.data.object;

                    console.log("charge.succeeded", chargeSucceededEvent);
                    break;
                case 'payment_intent.succeeded': 
                    const paymentIntentSucceeded = event.data.object;

                    console.log("payment_intent.succeeded", paymentIntentSucceeded);
                    break;
                case 'payment_method.updated': 
                    const paymentMethodUpdated = event.data.object;

                    console.log('payment_method.updated', paymentMethodUpdated);
                    break;
                case 'payout.canceled': 
                    const payoutCancelled = event.data.object;

                    console.log("payout.canceled", payoutCancelled);
                    break;
                case 'payout.created': 
                    const payoutCreated = event.data.object;

                    console.log("payout.created", payoutCreated);
                    break;
                case 'payout.failed': 
                    const payoutFailed = event.data.object;

                    console.log("payout.failed", payoutFailed);
                    break;  
                case 'payout.paid': 
                    const payoutPaid = event.data.object;

                    console.log("payout.paid", payoutPaid);
                    break;
                case 'payout.updated': 
                    const payoutUpdated = event.data.object;

                    console.log("payout.updated", payoutUpdated);
                    break;
                default:    
                    console.log(`Unhandled event type ${event.type}`);
            }
        
            // Return a response to acknowledge receipt of the event
            response.json({
                received: true
            });
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
        }
    });
});

module.exports = router;