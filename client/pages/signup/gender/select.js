import React, { Fragment } from "react";
import GenderSelection from "../../../components/signup/gender/select.js";

const GenderSelectionPage = (props) => {
    return (
        <Fragment>
            <GenderSelection props={props} />
        </Fragment>
    );
}
export default GenderSelectionPage;