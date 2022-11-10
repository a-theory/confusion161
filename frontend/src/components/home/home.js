import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {sendList} from "../../redux/modules/categories";
import {Button, ButtonBase} from "@mui/material";
import {sendDelete} from "../../redux/modules/categories";
import {OneTimeButton} from "../utils/custom";
import {stylesHome} from "../../styles/main";
import {useWindowDimensions} from "../../utils/windowDimensions"

function Home() {
    const { width } = useWindowDimensions();
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
            <div style={stylesHome.Title}>Confusion161</div>
            <Link style={stylesHome.Email} to={"getGpg"}>
                gpg only
            </Link>
            <div style={stylesHome.SimpleOld}>
                Abstract
            </div>
            <div style={stylesHome.Bio}>
                <p style={{color: "#a22929"}}>Key Words:</p>
                <div style={{width: "80%"}}>
                    [
                    [<p style={stylesHome.BorderText}>security</p>],
                    [<p style={stylesHome.BorderText}>cyber world</p>],
                    [<p style={stylesHome.BorderText}>information technologies</p>],
                    [<p style={stylesHome.BorderText}>news</p>],
                    [<p style={stylesHome.BorderText}>law</p>]
                    ]
                </div>
            </div>
            <div style={stylesHome.SimpleOld}>
                Categories
            </div>
            {categories.categories && categories.categories.length !== 0 &&
                <table style={stylesHome.Ul}>
                    <tbody>
                        {categories.categories.map(i => (
                            <tr  key={i.id}>
                                {users.accessToken &&
                                    <td style={{width:"10%", border: "1px solid gray"}}>
                                        <OneTimeButton fullWidth color="secondary"
                                                onClick={()=>{
                                                    dispatch(sendDelete({
                                                        query: {id: i.id},
                                                    }))
                                                }}
                                        >
                                            Delete
                                        </OneTimeButton>
                                    </td>
                                }
                                <td style={stylesHome.Li}>
                                    <Button onClick={()=>{navigate(`/categories/${i.id}`)}}
                                                style={stylesHome.Link}
                                                onMouseEnter={changeBackground}
                                                onMouseLeave={changeBackgroundBack}
                                                fullWidth
                                    >
                                        {i.name}
                                    </Button>
                                </td>
                                {width > 800 &&
                                    <td style={{width:"30%", border: "1px solid gray"}}>
                                        <cite style={{padding:10}}> ({i.brief})</cite>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Home;
