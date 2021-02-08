import React, { Fragment } from 'react';
import BankTransferBeginHelper from "../../../../../../components/account/payments/payouts/addNew/bankTransfer/index.js";

const BankTransferBeginPage = (props) => {
    return (
        <Fragment>
            <BankTransferBeginHelper props={props} />
        </Fragment>
    );
}
export default BankTransferBeginPage;