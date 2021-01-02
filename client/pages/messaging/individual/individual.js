import React, { Fragment } from 'react';
import IndividualMessagingHelper from "../../../components/messaging/individual/individual.js";

const IndividualMessagingPage = (props) => {
    return (
        <Fragment>
            <IndividualMessagingHelper props={props} />
        </Fragment>
    );
}
export default IndividualMessagingPage;