import React, { Fragment } from "react";
import SigninHelper from "../../components/signin/signin.js";

const SigninPage = (props) => {
    return (
        <Fragment>
            <SigninHelper props={props} />
        </Fragment>
    );
}
export default SigninPage;