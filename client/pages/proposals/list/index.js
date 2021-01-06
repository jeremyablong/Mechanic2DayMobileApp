import React, { Fragment } from 'react';
import ProposalsListHelper from "../../../components/proposals/list/index.js";

const ProposalsListPage = (props) => {
    return (
        <Fragment>
            <ProposalsListHelper props={props} />
        </Fragment>
    );
}
export default ProposalsListPage;