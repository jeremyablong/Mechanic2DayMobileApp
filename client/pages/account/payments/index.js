import React, { Fragment } from 'react';
import PaymentMainPageHelper from "../../../components/account/payments/index.js";

const PaymentMainPage =  (props) => {
    return (
        <Fragment>
            <PaymentMainPageHelper props={props} />
        </Fragment>
    );
}
export default PaymentMainPage;