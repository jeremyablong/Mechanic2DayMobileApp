import React, { Fragment } from "react";
import PaypalMenuHelper from '../../../../components/account/payments/paypal/paypalMenu.js';

const PaypalMenuPage = (props) => {
    return (
        <Fragment>
            <PaypalMenuHelper props={props} />
        </Fragment>
    );
}
export default PaypalMenuPage;