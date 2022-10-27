import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {sendList} from "../../redux/modules/categories";
import {Button} from "@mui/material";
import {sendDelete} from "../../redux/modules/categories";

let styles = {
    Title: {
        textAlign: "left",
        // fontFamily: "OldEnglish",
        fontSize: "30px",
        marginLeft: "5%",
    },
    SimpleOld: {
        marginTop: "5%",
        marginLeft: "5%",
        fontFamily: "OldEnglish",
        fontSize: "20px",
        textAlign: "left",
    },
    Email: {
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
        padding: 10,
        width: "100%",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
        marginLeft: "10%",
    },
    Link: {
        fontFamily: "Gill Sans\", sans-serif",
        color: "#ad841c",
        transitionDuration: "1s",
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
            <div style={styles.Title}>C�nui{"\f"}on�61</div>
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
                    [<p style={styles.BorderText}>information</p>],
                    [<p style={styles.BorderText}>cyber world</p>],
                    [<p style={styles.BorderText}>information technologies</p>],
                    [<p style={styles.BorderText}>safe your time</p>],
                    [<p style={styles.BorderText}>news</p>]
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
                                <td style={{width:"10%", border: "1px solid gray"}}>
                                    {users.token &&
                                        <Button fullWidth color="secondary"
                                                onClick={()=>{
                                                    dispatch(sendDelete({id: i.id, token: users.token}))
                                                }}
                                        >
                                            Delete
                                        </Button>
                                    }
                                </td>
                                <td style={styles.Li}>
                                    <Link to={`/categories/${i.id}`} style={styles.Link}
                                          onMouseEnter={changeBackground}
                                          onMouseLeave={changeBackgroundBack}
                                    >
                                        {i.name}
                                    </Link><cite style={{color:"gray"}}> ({i.brief})</cite>
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
