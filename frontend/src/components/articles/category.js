import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {sendGetOne} from "../../redux/modules/categories";
import {sendDelete} from "../../redux/modules/articles";
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {OneTimeButton} from "../utils/custom";
import {stylesHome} from "../../styles/main";

export default function Category() {
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
            <div style={stylesHome.SimpleOld}>
                {categories.category?.name}
            </div>
            <div>
                <table style={stylesHome.Ul}>
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
                                <td style={stylesHome.Li}>
                                    <Button
                                        fullWidth
                                        onClick={()=>{navigate(`/articles/${i.id}`)}}
                                        style={stylesHome.Link}
                                        onMouseEnter={changeBackground}
                                        onMouseLeave={changeBackgroundBack}
                                    >
                                        {i.name}
                                    </Button>
                                </td>
                                <td style={{width:"30%", border: "1px solid gray"}}>
                                    <cite style={{padding:10}}>{i.brief}</cite>
                                </td>
                                <td style={stylesHome.Date}>
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
