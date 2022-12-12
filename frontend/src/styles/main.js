import { styled, alpha } from '@mui/material/styles';
import {InputBase} from '@mui/material';

export const CustomInput = styled(InputBase)(({ theme }) => ({
    width: '100%',
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        // color: "#a2a2a2",
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "rgba(255,255,255,0)",
        border: '1px solid #a2a2a2',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system fonts instead of the default Roboto fonts.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


export const styleAuth = {
    Title: {
        fontSize: "30px",
        fontFamily: "OldEnglish",
        color: "#7e92e5"
    },
    Div: {
        width: '320px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    Button: {
        width: '100%',
        height: '40px',
        marginBottom: 10,
        marginTop: 0,
    },
    TextField: {
        width: '100%',
        marginBottom: '10px',
        color: "#a2a2a2",
    },
    TextareaAutosize: {
        color: "#a2a2a2",
        background: "rgba(255,255,255,0)",
        width: '98%',
        margin: "auto",
        marginBottom: '5px',
        minHeight: 80,
        maxWidth: "98%"
    },
    Form: {
        display: "grid",
        gridRowGap: 8
    }
};

export const styleToolbar = {
    toolbar: {
        background: '#000000',
        boxShadow: '0 0 7px 1px #a22929, 0 0 0px #a22929',
    },
    button: {
        marginRight: '20px',
        fontSize: '15px',
    },
    Avatar: {
        boxShadow: '0 0 0 0px black, 0 0 2px #333',
        '&:hover': {
            boxShadow: '0 0 0 0px black, 0 0 5px #333',
        }
    },
    Link: {
        textAlign: "left",
        fontFamily: "OldEnglish",
        fontSize: "20px",
        marginLeft: "20px",
        color: "gray",
    },
}

export const stylesHome = {
    Title: {
        textAlign: "left",
        fontSize: "40px",
        marginLeft: "5%",
        fontFamily: "Entanglement",
        // color: "#7e92e5"
    },
    SimpleOld: {
        marginTop: 20,
        marginLeft: 20,
        fontFamily: "OldEnglish",
        fontSize: "20px",
        textAlign: "left",
        color: "#7e92e5"
    },
    Email: {
        fontFamily: "OldEnglish",
        marginLeft: "5%",
        color: "#37561d",
        fontSize: "20px",
        textAlign: "left"
    },
    Bio: {
        marginLeft: "10%",
        color: "gray",
        fontSize: "20px",
        textAlign: "left",
        marginBottom: 50
    },
    Li: {
        borderBottom: "1px dashed #ad841c",
        borderTop: "1px dashed #ad841c",
        width: "60%",
        transitionDuration: "100ms",
        borderCollapse: "collapse",
    },
    Link: {
        fontFamily: "Andale Mono, AndaleMono, monospace",
        color: "#ad841c",
        transitionDuration: "1s",
        textAlign: "left",
        textTransform: "none",
        fontSize: "medium"
    },
    BorderText: {
        boxShadow: '0 4px 2px -2px #a22929',
        display: "inline",
        marginRight: 10,
        marginLeft: 10,
    },
    Ul: {
        transitionDuration: "100ms",
        borderCollapse: "collapse",
        width: "100%"
    },
    Img: {
        width: "100%",
        position: "absolute",
    },
    Date: {
        width:"10%",
        padding: "10px",
        border: "1px solid gray",
        color: "#7e92e5",
        textAlign: "center"
    }
}
