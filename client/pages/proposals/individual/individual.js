import React, { Fragment } from 'react';
import IndividualProposalViewHelper from "../../../components/proposals/individual/individual.js";

const IndividualProposalViewPage = (props) => {
    return (
        <Fragment>
            <IndividualProposalViewHelper props={props} />
        </Fragment>
    );
}
export default IndividualProposalViewPage;