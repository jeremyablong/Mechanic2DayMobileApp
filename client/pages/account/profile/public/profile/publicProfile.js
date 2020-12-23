import React, { Fragment } from 'react';
import ViewPublicProfileHelper from "../../../../../components/account/profile/public/profile/publicProfile.js";

const ViewPublicProfilePage = (props) => {
    return (
        <Fragment>
            <ViewPublicProfileHelper props={props} />
        </Fragment>
    );
}
export default ViewPublicProfilePage;