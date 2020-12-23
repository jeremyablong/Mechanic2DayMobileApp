import React, { Fragment } from 'react';
import EditPaymentMethodsHelper from "../../../../components/account/payments/paymentMethods/index.js";


const EditPaymentMethodsPage = (props) => {
    return (
        <Fragment>
            <EditPaymentMethodsHelper props={props} />
        </Fragment>
    );
}
export default EditPaymentMethodsPage;