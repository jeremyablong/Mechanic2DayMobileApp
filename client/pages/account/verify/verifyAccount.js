import React, { Fragment } from 'react';
import VerifyAndValidateAccountStripeHelper from "../../../components/account/verify/verifyAccount.js";

const VerifyAndValidateAccountStripePage = (props) => {
    return (
        <Fragment>
            <VerifyAndValidateAccountStripeHelper props={props} />
        </Fragment>
    );
}
export default VerifyAndValidateAccountStripePage;