import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {sendList} from "../../redux/modules/categories";
import {Button, ButtonBase} from "@mui/material";
import {sendDelete} from "../../redux/modules/categories";

let styles = {
    Title: {
        textAlign: "left",
        fontSize: "40px",
        marginLeft: "5%",
        fontFamily: "Entanglement",
        color: "#7e92e5"
    },
    SimpleOld: {
        marginTop: "5%",
        marginLeft: "5%",
        fontFamily: "OldEnglish",
        fontSize: "20px",
        textAlign: "left",
    },
    Email: {
        fontFamily: "OldEnglish",
        marginLeft: "5%",
        color: "#37561d",
        fontSize: "20px",
        textAlign: "left"
    },
    Bio: {
        marginLeft: "10%",
        color: "gray",
        fontSize: "20px",
        textAlign: "left",
    },
    Li: {
        // display: "inline-block",
        // border: "1px solid white",
        // position: "relative",
        borderBottom: "1px dashed white",
        borderTop: "1px dashed white",
        width: "60%",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
    },
    Link: {
        fontFamily: "Gill Sans\", sans-serif",
        color: "#ad841c",
        transitionDuration: "1s",
        textAlign: "left",
        textTransform: "none"
    },
    BorderText: {
        // fontFamily: "Gill Sans\", sans-serif",
        // borderBottom: "1px solid red",
        boxShadow: '0 4px 2px -2px #a22929',
        display: "inline",
        marginRight: 10,
        marginLeft: 10,
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
    Img: {
        width: "100%",
        position: "absolute",
        // right: "5%",
    }
}

function Home() {
    const categories = useSelector(state => state.categories);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.status === 'idle'){
            dispatch(sendList())
        }
    },[dispatch])

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
            <div style={styles.Title}>Confusion161</div>
            <Link style={styles.Email} to={"getGpg"}>
                gpg only
            </Link>
            <div style={styles.SimpleOld}>
                Abstract
            </div>
            <div style={styles.Bio}>
                <p style={{color: "#a22929"}}>Key Words:</p>
                <div style={{width: "80%"}}>
                    [
                    [<p style={styles.BorderText}>security</p>],
                    [<p style={styles.BorderText}>cyber world</p>],
                    [<p style={styles.BorderText}>information technologies</p>],
                    [<p style={styles.BorderText}>news</p>],
                    [<p style={styles.BorderText}>law</p>]
                    ]
                </div>
            </div>
            <div style={styles.SimpleOld}>
                Categories
            </div>
            {categories.categories && categories.categories.length !== 0 &&
                <table style={styles.Ul}>
                    <tbody>
                        {categories.categories.map(i => (
                            <tr  key={i.id}>
                                {users.accessToken &&
                                    <td style={{width:"10%", border: "1px solid gray"}}>
                                        <Button fullWidth color="secondary"
                                                onClick={()=>{
                                                    dispatch(sendDelete({
                                                        query: {id: i.id},
                                                    }))
                                                }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                }
                                <td style={styles.Li}>
                                    <Button onClick={()=>{navigate(`/categories/${i.id}`)}}
                                                style={styles.Link}
                                                onMouseEnter={changeBackground}
                                                onMouseLeave={changeBackgroundBack}
                                                fullWidth
                                    >
                                        {i.name}
                                    </Button>
                                </td>
                                <td style={{width:"30%", border: "1px solid gray"}}>
                                    <cite style={{padding:10}}> ({i.brief})</cite>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Home;
