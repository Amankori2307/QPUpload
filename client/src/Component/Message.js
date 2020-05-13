import React from 'react';

function Message(props) {
    var classList = props.message.msgError?"alert-danger": "alert-success";
    return (
        <div className = {`alert ${classList}`}>
            {props.message.msgBody}
        </div>
    );
}

export default Message;