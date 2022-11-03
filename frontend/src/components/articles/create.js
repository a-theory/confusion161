import React, {useEffect} from "react";
import {Button, TextField, Typography} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendCreate} from "../../redux/modules/articles";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {Link} from "react-router-dom";
import {sendList} from "../../redux/modules/categories";
import {useSelector} from "react-redux";
import {Autocomplete} from "@mui/lab";

function Create() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const categories = useSelector(state => state.categories);

    const [name, setName] = r.useState('');
    const [brief, setBrief] = r.useState('');
    const [pdf, setPdf] = r.useState(null);
    const [Categories, setCategories] = r.useState([]);
    const navigate = rd.useNavigate();

    useEffect(() => {
        if (categories.status === 'idle'){
            dispatch(sendList())
        }
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendCreate({
            ids:[],
            categories:Categories,
            name,
            brief,
            file: pdf,
        }));
    };

    const onChangeName = (e) => setName(e.target.value);
    const onChangeBrief = (e) => setBrief(e.target.value);
    const onChangePdf = (e) => setPdf(e.target.files[0]);
    const onChangeCategories = (event, newValues) => {
        let arr = []
        for (let i = 0; i < newValues.length; i++){
            arr.push(newValues[i].id)
        }
        // const json = JSON.stringify();
        setCategories(arr);
    };

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Create a new article</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeName} required placeholder={'name'}/>
                <CustomInput onChange={onChangeBrief} required placeholder={'brief'}/>
                <Button
                    variant="outlined"
                    component="label"
                >
                    {pdf ? <div>{pdf.name}</div>:<div>Upload File</div>}
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
                            placeholder="category"
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
