import React from "react";

function NotFound() {
    const style = {
        err: {
            fontFamily: "OldEnglish",
            fontSize: "500%",
            textAlign: "center"
        },
    }
    return (
        <div className='main'>
            <div style={style.err}>
                404
            </div>
        </div>
    )
}

export default NotFound;
