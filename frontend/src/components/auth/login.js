import React from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendLogin} from "../../redux/modules/users";
import {useDispatch} from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom";
const Tr = useTranslation;

function Login() {
    const {t} = Tr();
    const dispatch = useDispatch();

    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendLogin({email, password}));
    };

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('sing in')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput inputProps={{ maxLength: 255, minLength: 3 }} onChange={onChangeEmail} required placeholder={t('email')} type='email'/>
                <CustomInput inputProps={{ maxLength: 20, minLength: 8 }}  onChange={onChangePassword} required placeholder={t('password')} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>Next</Button>
            </form>
            <Link to={"/register"} style={{color: "white"}}>
                Register
            </Link>
            <div style={{margin: "5%", textAlign: "justify"}}>
                if you want to help our project, you can register
            </div>
        </div>
    )
}

export default Login;
