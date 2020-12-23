import React, { Fragment } from "react";
import CreateBirthdayHelper from "../../../components/signup/createBirthday/create.js";

const CreateBirthdayPage = (props) => {
    return (
        <Fragment>
            <CreateBirthdayHelper props={props} />
        </Fragment>
    );
}
export default CreateBirthdayPage;