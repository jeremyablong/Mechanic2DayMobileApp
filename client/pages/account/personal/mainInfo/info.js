import React, { Fragment } from "react";
import EditPersonalInfoHelper from "../../../../components/account/personal/mainInfo/info.js";

const EditPersonalInfoPage = (props) => {
    return (
        <Fragment>
            <EditPersonalInfoHelper props={props} />
        </Fragment>
    );
}
export default EditPersonalInfoPage;