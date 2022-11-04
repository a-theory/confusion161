import React, {useState} from "react";
import {Button} from "@mui/material";

export function OneTimeButton(props){
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = () => {
        props.onClick();
        setIsDisabled(true);
    };

    return <Button
        {...props}
        disabled={isDisabled}
        onClick={handleClick}
    />
}
