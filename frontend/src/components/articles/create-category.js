import React, {useState} from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendCreate} from "../../redux/modules/categories";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as rr from "react-redux";
import {OneTimeButton} from "../utils/custom";

function Create() {
    const dispatch = useDispatch();
    const users = rr.useSelector(state => state.users);
    const [name, setName] = useState('');
    const [brief, setBrief] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendCreate({
            name,
            brief,
        }));
    };

    const onChangeName = (e) => setName(e.target.value);
    const onChangeBrief = (e) => setBrief(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>New category</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeName} required placeholder={'name'}/>
                <CustomInput onChange={onChangeBrief} required placeholder={'brief'}/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Next</Button>
            </form>
            <div>
                <Link to={"/create"} style={{color: "white", padding:10}}>
                    Create article
                </Link>
                <Link to={"/upload-image"} style={{color: "white", padding:10}}>
                    upload image
                </Link>
            </div>
        </div>
    )
}

export default Create;
