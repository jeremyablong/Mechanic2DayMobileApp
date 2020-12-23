import React, { Fragment } from "react";
import CreateNamePasswordHelper from "../../../components/signup/createNamePassword/create.js";

const CreateNamePasswordPage = (props) => {
    return (
        <Fragment>
            <CreateNamePasswordHelper props={props} />
        </Fragment>
    );
}
export default CreateNamePasswordPage;