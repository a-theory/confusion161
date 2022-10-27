import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendGetGpg} from "../../redux/modules/users";
import {Button} from "@mui/material";

let styles = {
    Title: {
        textAlign: "left",
        fontFamily: "OldEnglish",
        fontSize: "30px",
        marginLeft: "5%",
    },
}

function Home() {
    const gpg = useSelector(state => state.users.gpg);
    const dispatch = useDispatch();
    const [isPushed, setIsPushed] = useState(false);

    useEffect(() => {
        dispatch(sendGetGpg())
    },[])

    const handleCope = () => {
        navigator.clipboard.writeText(gpg.join('\n'))
        setIsPushed(true)
    }

    return (
        <div>
            <div style={styles.Title}>
                Gpg
            </div>
            <div style={{display: "flex", marginLeft: "15%"}}>
                <div style={{textAlign: "center"}}>
                    -----BEGIN PGP PUBLIC KEY BLOCK-----<br/>
                    <br/>
                    ***<br/>
                    -----END PGP PUBLIC KEY BLOCK-----<br/>
                </div>
                <Button style={{marginLeft: "5%"}} onClick={handleCope} variant='outlined'>
                    {!isPushed &&
                        <div>copy</div>
                    }
                    { isPushed &&
                        <b>coped ✅</b>
                    }
                </Button>
            </div>
        </div>
    );
}

export default Home;
