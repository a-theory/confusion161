import React, {useEffect, useState} from "react";
import {Button, TextField, Autocomplete} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendCreate} from "../../redux/modules/articles";
import {Link} from "react-router-dom";
import {sendList} from "../../redux/modules/categories";
import {useDispatch, useSelector} from "react-redux";

function Create() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    const [name, setName] = useState('');
    const [brief, setBrief] = useState('');
    const [html, setHtml] = useState(null);
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(sendList())
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendCreate({
            categories:Categories,
            name,
            brief,
            file: html,
        }));
    };

    const onChangeName = (e) => setName(e.target.value);
    const onChangeBrief = (e) => setBrief(e.target.value);
    const onChangePdf = (e) => setHtml(e.target.files[0]);
    const onChangeCategories = (event, newValues) => {
        let arr = []
        for (let i = 0; i < newValues.length; i++){
            arr.push(newValues[i].id)
        }
        setCategories(JSON.stringify(arr));
    };

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>New article</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeName} required placeholder={'name'}/>
                <CustomInput onChange={onChangeBrief} required placeholder={'brief'}/>
                <Button
                    variant="outlined"
                    component="label"
                >
                    {html ? <div>{html.name}</div>:<div>Upload File</div>}
                    <input
                        type="file"
                        accept="text/html"
                        hidden
                        onChange={onChangePdf}
                    />
                </Button>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    onChange={onChangeCategories}
                    options={categories.categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="categories"
                            placeholder="add category"
                        />
                    )}
                />
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Next</Button>
            </form>
            <div>
                <Link to={"/create-category"} style={{color: "white", padding:10}}>
                    Create category
                </Link>
                <Link to={"/upload-image"} style={{color: "white", padding:10}}>
                    upload image
                </Link>
            </div>
        </div>
    )
}

export default Create;
