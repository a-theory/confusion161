import React, {useState} from "react";
import {sendRegister} from "../../redux/modules/users";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
const Tr = useTranslation;

function Register() {
    const {t} = Tr();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendRegister({email, password, name}));
    }

    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangeName = (e) => setName(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('register')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeName} inputProps={{ maxLength: 25, minLength: 1 }} required placeholder={'name'}/>
                <CustomInput onChange={onChangeEmail} inputProps={{ maxLength: 255, minLength: 3 }} required placeholder={'email'} type='email'/>
                <CustomInput onChange={onChangePassword} inputProps={{ maxLength: 20, minLength: 8 }} required placeholder={'password'} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>"Next"</Button>
            </form>
            <Link to={"/login"} style={{color: "white"}}>
                Login
            </Link>
            <div style={{marginTop: "5%", textAlign: "left"}}>
                Person* you = new Person();
            </div>
        </div>
    );
}

export default Register;
