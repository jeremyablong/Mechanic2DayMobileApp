import React, { Fragment } from 'react';
import PaymentCardAddNewHelper from "../../../../components/account/payments/create/paymentCardCreate.js";


const PaymentCardAddNewPage = (props) => {
    return (
        <Fragment>
            <PaymentCardAddNewHelper props={props} />
        </Fragment>
    );
}
export default PaymentCardAddNewPage;