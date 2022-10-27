import React from "react";
import {sendRegister} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {Button, Tabs, Tab} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom";
const Tr = useTranslation;

function Register() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [name, setName] = r.useState('');
    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {email, password, name};
        dispatch(sendRegister({user: User, navigate: navigate}));
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
                Person* you = new Person(); <br/>
                int cnt = you.skills.size(); <br/>
                vector{"<string>"} reqSkills;<br/>
                reqSkills.push_back("cyber security");
                reqSkills.push_back("math");
                reqSkills.push_back("physics");
                reqSkills.push_back("laws");
                reqSkills.push_back("AI");
                reqSkills.push_back("IT");
                <p> </p>
                {"for (int i = 0; i < cnt; i++) {"} <br/>
                ....for (int j = 0; j {"< reqSkills.size();"} j++) {"{"} <br/>
                ........if(you.skills[i] == reqSkills[j]) {"{"} <br/>
                ............cout {"<< \"you are welcome\\n\";"} <br/>
                ............cout {"<< \"we will contact you\\n\";"} <br/>
                ............return 0; <br/>
                ........{"}"} <br/>
                ....{"}"} <br/>
                <p> </p>
                cout {"<< \"you have to learn a bit and after you can try\" << endl;"} <br/>
                return 1;
            </div>
        </div>
    );
}

export default Register;
