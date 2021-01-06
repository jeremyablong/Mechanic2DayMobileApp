import React, { Fragment } from 'react';
import ActiveJobsMainHelper from "../../../components/activeRepairs/main/index.js";

const ActiveJobsMainPage = (props) => {
    return (
        <Fragment>
            <ActiveJobsMainHelper props={props} />
        </Fragment>
    );
}
export default ActiveJobsMainPage;