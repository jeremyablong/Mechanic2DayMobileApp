import React, { Fragment } from 'react';
import CategoriesMainHelper from "../../components/categories/index.js";

const CategoriesMainPage = (props) => {
    return (
        <Fragment>
            <CategoriesMainHelper props={props} />
        </Fragment>
    );
}
export default CategoriesMainPage;