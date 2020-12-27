import React, { Fragment } from 'react';
import MechanicListingHelper from "../../../components/listings/mechanics/mechanicListing.js";


const MechanicListingPage = (props) => {
    return (
        <Fragment>
            <MechanicListingHelper props={props} />
        </Fragment>
    );
}
export default MechanicListingPage;