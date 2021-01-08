import React, { Fragment } from 'react';
import ViewIndividualJobHelper from "../../../components/activeRepairs/individual/viewJob.js";


const ViewIndividualJobPage = (props) => {
    return (
        <Fragment>
            <ViewIndividualJobHelper props={props} />
        </Fragment>
    );
}
export default ViewIndividualJobPage;