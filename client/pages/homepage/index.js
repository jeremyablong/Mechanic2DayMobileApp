import React, { Fragment, useState } from "react";
import HomepageMainHelper from "../../components/homepage/index.js";

const HomepageMainPage = (props) => {
    return (
        <Fragment>
            <HomepageMainHelper props={props} />
        </Fragment>
    );
}
export default HomepageMainPage;