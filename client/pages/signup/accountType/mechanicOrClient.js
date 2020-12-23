import React, { Fragment } from "react";
import CreateAccountTypeHelper from "../../../components/signup/accountType/mechanicOrClient.js";

const CreateAccountTypePage = (props) => {
    return (
        <Fragment>
            <CreateAccountTypeHelper props={props} />
        </Fragment>
    );
}
export default CreateAccountTypePage;