import React, { Fragment } from 'react';
import NoTowConfirmOnSiteHelper from "../../../components/towTruckDriver/noTowRequiredComplete/confirm.js";


const NoTowConfirmOnSitePage = (props) => {
    return (
        <Fragment>
            <NoTowConfirmOnSiteHelper props={props} />
        </Fragment>
    );
}
export default NoTowConfirmOnSitePage;