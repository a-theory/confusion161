import React from "react";
import * as rr from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

export function RouteAuthorized(rest) {
    const users = rr.useSelector(state => state.users);
    if (users.accessToken){
        return <Outlet />;
    }
    return (
        <Navigate to={"/login"} replace />
    );
}

export function FallBack(){
    return(
        <div style={{marginTop: "10%", fontSize: 50}}>
            {/*Loading...*/}
        </div>
    )
}
