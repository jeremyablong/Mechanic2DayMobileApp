import React, { Fragment } from 'react';
import ManageActiveRepairHelper from "../../../components/activeRepairs/manage/manageActiveRepair.js";

const ManageActiveRepairPage = (props) => {
    return (
        <Fragment>
            <ManageActiveRepairHelper props={props} />
        </Fragment>
    );
}
export default ManageActiveRepairPage;