import React, { Fragment } from "react";
import PreviewListingViewHelper from "../../../../components/listings/preview/preview.js";


const PreviewListingViewPage = (props) => {
    return (
        <Fragment>
            <PreviewListingViewHelper props={props} />
        </Fragment>
    );
}
export default PreviewListingViewPage;