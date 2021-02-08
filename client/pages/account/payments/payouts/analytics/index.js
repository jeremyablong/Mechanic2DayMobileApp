import React, { Fragment } from 'react';
import PaymentAnalyticsDashboardHelper from "../../../../../components/account/payments/payouts/analytics/index.js";


const PaymentAnalyticsDashboardPage = (props) => {
    return (
        <Fragment>
            <PaymentAnalyticsDashboardHelper props={props} />
        </Fragment>
    );
}
export default PaymentAnalyticsDashboardPage;