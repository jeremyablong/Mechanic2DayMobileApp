import React, { Fragment } from "react";
import MessagingConversationsHelper from "../../../components/messaging/conversations/index.js";


const MessagingConversationsPage = (props) => {
    return (
        <Fragment>
            <MessagingConversationsHelper props={props} />
        </Fragment>
    );
}
export default MessagingConversationsPage;