import React, {useState} from "react";
import {Button} from "@mui/material";
import {styleAuth} from "../../styles/main"
import {cleanUrl, sendUploadImage} from "../../redux/modules/articles";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {OneTimeButton} from "../utils/custom";

function Create() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const articles = useSelector(state => state.articles);

    const [image, setImage] = useState(null);
    const [isPushed, setIsPushed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendUploadImage({
            file: image,
        }));
    };

    const onChangeImage = (e) => {
        setImage(e.target.files[0])
        setIsPushed(false);
        dispatch(cleanUrl());
    };
    const handleCope = () => {
        navigator.clipboard.writeText(articles.url)
        setIsPushed(true);
    }

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>Upload a new image</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <div style={{display: "flex"}}>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                    >
                        {image ? <div>{image.name}</div>:<div>Upload Image</div>}
                        <input
                            type="file"
                            accept="image/gif, image/jpeg, image/png"
                            hidden
                            onChange={onChangeImage}
                        />
                    </Button>
                    {articles.url &&
                        <OneTimeButton style={{marginLeft: 10}} onClick={handleCope} variant='outlined'>
                            <div>copy</div>
                        </OneTimeButton>
                    }
                </div>

                <OneTimeButton style={styleAuth.Button} type="submit" variant='contained' color='primary'>Next</OneTimeButton>
            </form>
            <div style={{display: "flex"}}>
                <Link to={"/create-category"} style={{color: "white", padding:10}}>
                    Create category
                </Link>
                <Link to={"/create"} style={{color: "white", padding:10}}>
                    Create article
                </Link>
            </div>
        </div>
    )
}

export default Create;
