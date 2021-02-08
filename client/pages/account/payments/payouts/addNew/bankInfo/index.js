import React, { Fragment } from 'react';
import BankAccountInfoHelper from "../../../../../../components/account/payments/payouts/addNew/bankInfo/index.js";

const BankAccountInfoPage = (props) => {
    return (
        <Fragment>
            <BankAccountInfoHelper props={props} />
        </Fragment>
    );
}
export default BankAccountInfoPage;