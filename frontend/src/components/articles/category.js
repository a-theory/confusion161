import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {sendGetOne} from "../../redux/modules/categories";
import {sendDelete} from "../../redux/modules/articles";
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {OneTimeButton} from "../utils/custom";

let styles = {
    Title: {
        textAlign: "left",
        fontFamily: "OldEnglish",
        fontSize: "30px",
        marginLeft: "5%",
    },
    SimpleOld: {
        marginLeft: "5%",
        fontFamily: "OldEnglish",
        fontSize: "20px",
        textAlign: "left",
    },
    Li: {
        borderBottom: "1px dashed white",
        borderTop: "1px dashed white",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
    },
    Link: {
        fontFamily: "Gill Sans\", sans-serif",
        color: "#ad841c",
        transitionDuration: "1s",
        textTransform: "none"
    },
    BorderText: {
        // fontFamily: "Gill Sans\", sans-serif",
        border: "1px solid red",
        display: "inline",
        margin: 10
    },
    Ul: {
        // marginLeft: "20%",
        // marginRight: "20%",
        borderBottom: "1px dashed white",
        borderTop: "1px dashed white",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
        width: "100%"
    },
    Date: {
        width:"10%",
        padding: "10px",
        border: "1px solid gray",
        color: "#7e92e5",
        textAlign: "center"
    }
}

function Home() {
    const categories = useSelector(state => state.categories);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        if (categories.status === 'idle'){
            dispatch(sendGetOne({query: {id}}))
        }
    },[])

    function changeBackground(e) {
        e.target.style.textDecoration = "none";
        e.target.style.color = "#ffcd5e";
    }
    function changeBackgroundBack(e) {
        e.target.style.textDecoration = "";
        e.target.style.color = "#ad841c";
    }

    return (
        <div>
            <div style={styles.Title}>
                {categories.category?.name}
            </div>
            <div style={styles.Simple}>
                <table style={styles.Ul}>
                    <tbody>
                        {categories.category?.Articles?.map(i => (
                            <tr key={i.id}>
                                {users.accessToken &&
                                    <td style={{width: "10%", border: "1px solid gray"}}>
                                        <OneTimeButton fullWidth
                                                color="secondary"
                                                onClick={() => {
                                                    dispatch(sendDelete({
                                                        query: {id: i.id},
                                                    }))
                                                }}
                                        >
                                            Delete
                                        </OneTimeButton>
                                    </td>
                                }
                                <td style={styles.Li}>
                                    <Button
                                        fullWidth
                                        onClick={()=>{navigate(`/articles/${i.id}`)}}
                                        style={styles.Link}
                                        onMouseEnter={changeBackground}
                                        onMouseLeave={changeBackgroundBack}
                                    >
                                        {i.name}
                                    </Button>
                                </td>
                                <td style={{width:"30%", border: "1px solid gray"}}>
                                    <cite style={{padding:10}}>{i.brief}</cite>
                                </td>
                                <td style={styles.Date}>
                                    {(new Date(i.createdAt)).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
