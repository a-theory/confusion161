import * as React from 'react';
import {
    Button,
} from "@mui/material";
import {styleToolbar} from "../../styles/main";
import {Link, useNavigate} from "react-router-dom"
import {
    Box,
    Fab,
    AppBar,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import {useDispatch, useSelector} from "react-redux";
import {sendLogout} from "../../redux/modules/users";
import {OneTimeButton} from "../utils/custom";

export function ScrollTop(props) {
    const { children } = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 100,
        });

    const handleClick = (event) => {
        event.view.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};


export default function ToolbarMain(props) {
    const users = useSelector(state => state.users);
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const path = window.location.pathname.search("article") !== -1

    const log_out = () => {
        if (users.accessToken){
            dispatch(sendLogout())
        }
        navigate("/login")
    }

    return (
        <div>
            <AppBar style={styleToolbar.toolbar}>
                <Toolbar >
                    <Box display={'flex'}>
                        <Link style={styleToolbar.Link} to={"/"}>
                            Home
                        </Link>
                        {users.accessToken &&
                            <Link style={styleToolbar.Link} to={"/create"}>
                                Create
                            </Link>
                        }
                        {users.accessToken &&
                            <Link style={styleToolbar.Link} to={"/users"}>
                                TM
                            </Link>
                        }
                    </Box>
                    <Box display={'flex'} style={{flexGrow: 7}}> </Box>
                    <div>
                        {!path &&
                            <Button
                                style={{textTransform: "none", fontSize:15}}
                                color='primary'
                                onClick={log_out}
                            >
                                ℂøŋƒůƨ☂øȵ❶❻❶
                            </Button>
                        }
                        {path &&
                            <OneTimeButton
                                color='primary'
                                onClick={()=>{
                                    window.open(articles?.article?.pdf,'_blank')
                                }}
                            >
                                Download the article 🇺🇦
                            </OneTimeButton>
                        }
                    </div>
                    </Toolbar>
                </AppBar>
            <Toolbar />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
    );
}

