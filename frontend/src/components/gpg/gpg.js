import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendGetGpg} from "../../redux/modules/users";
import {OneTimeButton} from "../utils/custom";

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

    useEffect(() => {
        dispatch(sendGetGpg())
    },[])

    const handleCope = () => {
        navigator.clipboard.writeText(gpg.join('\n'))
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
                <OneTimeButton style={{marginLeft: "5%"}} onClick={handleCope} variant='outlined'>
                    <div>copy</div>
                </OneTimeButton>
            </div>
        </div>
    );
}

export default Home;
