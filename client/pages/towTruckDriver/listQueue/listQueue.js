import React, { Fragment } from "react";
import ListQueueHelper from "../../../components/towTruckDriver/listQueue/listQueue.js";

const ListQueuePage = (props) => {
    return (
        <Fragment>
            <ListQueueHelper props={props} />
        </Fragment>
    );
}
export default ListQueuePage;