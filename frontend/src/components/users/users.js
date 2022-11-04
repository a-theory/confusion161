import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {sendDelete, sendEmailVerify, sendGetRequests, sendGetUsers} from "../../redux/modules/users";
import {OneTimeButton} from "../utils/custom";

let styles = {
    Title: {
        textAlign: "left",
        fontFamily: "OldEnglish",
        fontSize: "20px",
    },

    SimpleOld: {
        marginLeft: "5%",
        fontFamily: "OldEnglish",
        fontSize: "20px",
        textAlign: "left",
    },
    Li: {
        border: "1px dashed gray",
        padding: 10,
        width: "30%",
        borderCollapse: "collapse",
    },
    Ul: {
        borderBottom: "1px dashed white",
        borderTop: "1px dashed white",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
        width: "100%"
    },
    Email: {
        color: "#ad841c",
        width:"50%",
        border: "1px solid gray",
        padding: 10
    }
}

function Home() {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [isPushed, setIsPushed] = useState(false);
    const [isPushedRequest, setIsPushedRequests] = useState(false);

    useEffect(() => {
        dispatch(sendGetUsers());
    },[])

    function get_requests() {
        dispatch(sendGetRequests());
        setIsPushedRequests(true);
    }

    function get_users() {
        dispatch(sendGetUsers());
        setIsPushedRequests(false);
    }


    return (
        <div>
            <div style={{display: "flex"}}>
                {isPushedRequest &&
                    <Button style={styles.Title} onClick={get_users}>
                        Go to Users
                    </Button>
                }
                {!isPushedRequest &&
                    <Button style={styles.Title} onClick={get_requests}>
                        Go to Requests
                    </Button>
                }
            </div>
            <table style={styles.Ul}>
                <tbody>
                {users?.users?.map(i => (
                    <tr key={i.id}>
                        <td style={{width:"10%", border: "1px solid gray"}}>
                            <OneTimeButton fullWidth
                                    onClick={()=>{
                                        dispatch(sendDelete({
                                            query: {id: i.id},
                                        }))
                                    }}
                                    color="secondary"
                            >
                                Delete
                            </OneTimeButton>
                        </td>
                        <td style={styles.Li}>
                            {i.name}
                        </td>
                        <td style={styles.Email}>
                            {i.email}
                        </td>
                        <td style={{width:"10%", border: "1px solid gray"}}>
                            {!isPushedRequest && <OneTimeButton fullWidth onClick={
                                () => {
                                    navigator.clipboard.writeText(i.email)
                                }
                            }>
                                <div>copy</div>
                            </OneTimeButton>}
                            {isPushedRequest &&
                                <OneTimeButton fullWidth
                                        onClick={()=>{
                                            dispatch(sendEmailVerify({
                                                id: i.id,
                                            }))
                                        }}>
                                    verify
                                </OneTimeButton>
                            }
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
