import React, { Fragment } from "react";
import VerifyCodeEmailHelper from "../../../components/signup/verifyEmailCode/verify.js";

const VerifyCodeEmailPage = (props) => {
    return (
        <Fragment>
            <VerifyCodeEmailHelper props={props} />
        </Fragment>
    );
}
export default VerifyCodeEmailPage;