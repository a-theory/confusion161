import React, {useState} from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendCreate} from "../../redux/modules/categories";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as rr from "react-redux";

function Create() {
    const dispatch = useDispatch();
    const users = rr.useSelector(state => state.users);
    const [name, setName] = useState('');
    const [brief, setBrief] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendCreate({name, brief, navigate: navigate, token: users.token}));
    };

    const onChangeName = (e) => setName(e.target.value);
    const onChangeBrief = (e) => setBrief(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Create a new category</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeName} required placeholder={'name'}/>
                <CustomInput onChange={onChangeBrief} required placeholder={'brief'}/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Next</Button>
            </form>
            <Link to={"/create"} style={{color: "white"}}>Create article</Link>
        </div>
    )
}

export default Create;
