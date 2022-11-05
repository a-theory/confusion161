import React, {lazy, Suspense} from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {createTheme}    from "@mui/material";
import {ThemeProvider}  from "@emotion/react";

import {RouteAuthorized, FallBack} from "./components/utils/route"

const Login          = lazy(()=> import("./components/auth/login"));
const Register       = lazy(()=> import("./components/auth/register"));
const Toolbar        = lazy(()=> import("./components/toolbar/toolbar"));
const NotFound       = lazy(()=> import("./components/utils/notfound"));
const Home           = lazy(()=> import("./components/home/home"));
const Category       = lazy(()=> import("./components/articles/category"));
const Create         = lazy(()=> import("./components/articles/create"));
const Gpg            = lazy(()=> import("./components/gpg/gpg"));
const Article        = lazy(()=> import("./components/articles/article"));
const CreateCategory = lazy(()=> import("./components/articles/create-category"));
const Users          = lazy(()=> import("./components/users/users"));
const UploadImage    = lazy(()=> import("./components/articles/upload-image"));

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
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <Suspense fallback={FallBack()}>
                    <BrowserRouter>
                        <Toolbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/categories/:id" element={<Category/>}/>
                            <Route path="/articles/:id" element={<Article/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/getGpg" element={<Gpg/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<NotFound/>}/>
                            <Route element={<RouteAuthorized />}>
                                <Route exact path="/create" element={<Create/>}/>
                                <Route exact path="/create-category" element={<CreateCategory/>}/>
                                <Route exact path="/upload-image" element={<UploadImage/>}/>
                                <Route exact path="/users" element={<Users/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Suspense>
            </div>
        </ThemeProvider>
    );
}

export default App;
