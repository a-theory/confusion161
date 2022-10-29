import React from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/utils/notfound";
import Home from "./components/home/home";
import Category from "./components/articles/category";
import Create from "./components/articles/create";
import Gpg from "./components/gpg/gpg";
import {useSelector} from "react-redux";
import Article from "./components/articles/article";
import CreateCategory from "./components/articles/create-category";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Users from "./components/users/users";
import UploadImage from "./components/articles/upload-image";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7e92e5',
        },
        secondary: {
            main: '#a22929'
        }
    },
});

function App(){
    const accessToken = useSelector(state => state.users.accessToken);
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Toolbar/>}/>
                    </Routes>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/categories/:id" element={<Category/>}/>
                        <Route exact path="/articles/:id" element={<Article/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/getGpg" element={<Gpg/>}/>
                        <Route exact path="/register" element={<Register/>}/>
                        <Route path="*" element={<NotFound/>}/>

                        {accessToken && <Route exact path="/create" element={<Create/>}/>}
                        {accessToken && <Route exact path="/create-category" element={<CreateCategory/>}/>}
                        {accessToken && <Route exact path="/upload-image" element={<UploadImage/>}/>}
                        {accessToken && <Route exact path="/users" element={<Users/>}/>}
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
