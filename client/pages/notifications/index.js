import React, { Fragment } from "react";
import NotificationsHelper from "../../components/notifications/index.js";


const NotificationsPage = (props) => {
    return (
        <Fragment>
            <NotificationsHelper props={props} />
        </Fragment>
    );
}
export default NotificationsPage;